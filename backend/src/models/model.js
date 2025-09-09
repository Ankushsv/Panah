const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || '12345678901234567890123456789012' 
const IV_LENGTH = 16

function encrypt(text) {
  if (!text) return text
  const iv = crypto.randomBytes(IV_LENGTH)
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv)
  let encrypted = cipher.update(text, 'utf8')
  encrypted = Buffer.concat([encrypted, cipher.final()])
  return iv.toString('hex') + ':' + encrypted.toString('hex')
}

function decrypt(text) {
  if (!text) return text
  const parts = text.split(':')
  const iv = Buffer.from(parts.shift(), 'hex')
  const encryptedText = Buffer.from(parts.join(':'), 'hex')
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv)
  let decrypted = decipher.update(encryptedText)
  decrypted = Buffer.concat([decrypted, decipher.final()])
  return decrypted.toString()
}

const StudentSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: String,
  email: { type: String, unique: true },
  password_hash: String,
  branch: String,
  year_of_study: Number,
  gender: String,
  category: String,
  caste: String,
  registration_date: { type: Date, default: Date.now },
  is_active: Boolean
})

StudentSchema.pre('save', async function (next) {
  if (!this.isModified('password_hash')) return next()
  const salt = await bcrypt.genSalt(10)
  this.password_hash = await bcrypt.hash(this.password_hash, salt)
  next()
})

StudentSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password_hash)
}

const TokenSchema = new mongoose.Schema({
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  access_token: { type: String, required: true },
  refresh_token: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  expires_at: { type: Date, required: true }
})

const ForumSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: String,
  description: String,
  created_at: { type: Date, default: Date.now },
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' }
})

const ForumPostSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  forum_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Forum' },
  content: String,
  created_at: { type: Date, default: Date.now },
  level: Number,
  badge_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Badge' },
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  is_anonymous: { type: Boolean, default: false }
})

const BadgeSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: String,
  description: String,
  level: Number,
  icon_url: String
})

const BuddyCheckSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  paired_at: { type: Date, default: Date.now },
  is_active: Boolean,
  last_checkin: Date,
  is_anonymous: { type: Boolean, default: false },
  is_encrypted: Boolean,
  student1_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  student2_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' }
})

const BuddyCheckInteractionSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  buddy_check_id: { type: mongoose.Schema.Types.ObjectId, ref: 'BuddyCheck' },
  message_text: { type: String, set: encrypt, get: decrypt },
  sent_at: { type: Date, default: Date.now },
  is_encrypted: { type: Boolean, default: true },
  sender_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  is_anonymous: { type: Boolean, default: false }
}, { toJSON: { getters: true }, toObject: { getters: true } })

const QuestionnaireSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: String,
  description: String,
  created_at: { type: Date, default: Date.now }
})

const QuestionnaireResponseSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  questionnaire_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Questionnaire' },
  response_data: { type: String, set: encrypt, get: decrypt },
  submitted_at: { type: Date, default: Date.now },
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  is_anonymous: { type: Boolean, default: true }
}, { toJSON: { getters: true }, toObject: { getters: true } })

const CommonProblemSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  description: String,
  frequency: Number,
  last_reported: Date
})

const MoodJournalSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  entry_date: Date,
  entry_text: { type: String, set: encrypt, get: decrypt },
  sentiment_score: Number,
  ai_coping_strategy: { type: String, set: encrypt, get: decrypt },
  voice_entry_url: String,
  is_encrypted: { type: Boolean, default: true },
  is_anonymous: { type: Boolean, default: true }
}, { toJSON: { getters: true }, toObject: { getters: true } })

const DemographicAnalysisSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  branch: String,
  year_of_study: Number,
  gender: String,
  category: String,
  caste: String,
  analysis_type: String,
  analysis_date: { type: Date, default: Date.now },
  result_data: mongoose.Schema.Types.Mixed,
  is_anonymous: { type: Boolean, default: true }
})

const MentalHealthStatSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  recorded_at: { type: Date, default: Date.now },
  mood_score: Number,
  stress_level: Number,
  anxiety_level: Number,
  depression_level: Number,
  policy_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Policy' },
  is_anonymous: { type: Boolean, default: true }
})

const PolicySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: String,
  description: String,
  effective_from: Date,
  effective_to: Date
})

module.exports = {
  Student: mongoose.model('Student', StudentSchema),
  Token: mongoose.model('Token', TokenSchema),
  Forum: mongoose.model('Forum', ForumSchema),
  ForumPost: mongoose.model('ForumPost', ForumPostSchema),
  Badge: mongoose.model('Badge', BadgeSchema),
  BuddyCheck: mongoose.model('BuddyCheck', BuddyCheckSchema),
  BuddyCheckInteraction: mongoose.model('BuddyCheckInteraction', BuddyCheckInteractionSchema),
  Questionnaire: mongoose.model('Questionnaire', QuestionnaireSchema),
  QuestionnaireResponse: mongoose.model('QuestionnaireResponse', QuestionnaireResponseSchema),
  CommonProblem: mongoose.model('CommonProblem', CommonProblemSchema),
  MoodJournal: mongoose.model('MoodJournal', MoodJournalSchema),
  DemographicAnalysis: mongoose.model('DemographicAnalysis', DemographicAnalysisSchema),
  MentalHealthStat: mongoose.model('MentalHealthStat', MentalHealthStatSchema),
  Policy: mongoose.model('Policy', PolicySchema)
}
