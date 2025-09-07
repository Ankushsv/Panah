"""
Text Preprocessing Pipeline Module (Safer Version)

A comprehensive, configurable text preprocessing pipeline for NLP tasks.
Supports various cleaning operations including HTML removal, slang expansion,
tokenization, stemming, lemmatization, and more.

Author: Your Name
Version: 1.1.0
"""

import re
import string
from typing import List, Union, Optional, Dict, Any
import warnings

# --- Try to import optional dependencies individually (do NOT raise here) ---
MISSING_DEPS = {}
_HAS_NLTK = _HAS_TEXTBLOB = _HAS_EMOJI = _HAS_SPACY = _HAS_PANDAS = False

try:
    import pandas as pd
    _HAS_PANDAS = True
except Exception as e:
    MISSING_DEPS['pandas'] = str(e)

try:
    import emoji as _emoji
    _HAS_EMOJI = True
except Exception as e:
    MISSING_DEPS['emoji'] = str(e)

try:
    from textblob import TextBlob as _TextBlob
    _HAS_TEXTBLOB = True
except Exception as e:
    MISSING_DEPS['textblob'] = str(e)

try:
    import spacy as _spacy
    _HAS_SPACY = True
except Exception as e:
    MISSING_DEPS['spacy'] = str(e)

try:
    import nltk as _nltk
    from nltk import word_tokenize as _word_tokenize
    from nltk.stem import PorterStemmer as _PorterStemmer
    from nltk.stem import WordNetLemmatizer as _WordNetLemmatizer
    _HAS_NLTK = True
except Exception as e:
    MISSING_DEPS['nltk'] = str(e)


class TextPreprocessor:
    """Comprehensive text preprocessing pipeline for NLP."""

    SLANG_DICT = {
        "LOL": "Laughing Out Loud",
        "GR8": "Great",
        "ASAP": "As Soon As Possible",
        "FR": "For Real",
        # Add more as needed...
    }

    def __init__(self, **config):
        """Initialize preprocessor with configuration."""
        default_config = {
            'remove_html': True,
            'remove_urls': True,
            'remove_emojis': True,
            'expand_slang': True,
            'correct_spelling': False,
            'convert_lowercase': True,
            'remove_punctuation': True,
            'remove_numbers': False,
            'remove_single_chars': True,
            'remove_stopwords': True,
            'normalize_whitespace': True,
            'tokenize': True,
            'stem_words': False,
            'lemmatize_words': True,
            'spacy_model': 'en_core_web_sm'
        }
        self.config = {**default_config, **config}

        # If both enabled, prefer lemmatization
        if self.config['stem_words'] and self.config['lemmatize_words']:
            warnings.warn("Both stemming and lemmatization enabled. Using lemmatization only.")
            self.config['stem_words'] = False

        # Initialize NLP components lazily
        self._initialize_components()

    def _initialize_components(self):
        """Initialize NLP components safely and lazily."""
        self.stemmer = None
        self.lemmatizer = None
        self.nlp = None
        self.stop_words = set()

        if self.config['stem_words'] and _HAS_NLTK:
            try:
                self.stemmer = _PorterStemmer()
            except Exception:
                self.stemmer = None

        if self.config['lemmatize_words']:
            if _HAS_NLTK:
                try:
                    self.lemmatizer = _WordNetLemmatizer()
                except Exception:
                    self.lemmatizer = None
            if self.lemmatizer is None and _HAS_SPACY:
                try:
                    self.nlp = _spacy.load(self.config.get('spacy_model', 'en_core_web_sm'))
                except Exception:
                    self.nlp = None

        if _HAS_SPACY and self.nlp is None:
            try:
                self.nlp = _spacy.load(self.config.get('spacy_model', 'en_core_web_sm'))
            except Exception:
                self.nlp = None

        if self.nlp is not None:
            try:
                self.stop_words = self.nlp.Defaults.stop_words
            except Exception:
                self.stop_words = set()

        if not self.stop_words and _HAS_NLTK:
            try:
                from nltk.corpus import stopwords as _nltk_stopwords
                self.stop_words = set(_nltk_stopwords.words('english'))
            except Exception:
                self.stop_words = set()

    # --- Helper methods ---
    def _remove_html_tags(self, text: str) -> str:
        return re.sub(r'<.*?>', '', text)

    def _remove_urls(self, text: str) -> str:
        return re.sub(r'https?://\S+|www\.\S+', '', text)

    def _remove_punctuation(self, text: str) -> str:
        return text.translate(str.maketrans('', '', string.punctuation))

    def _expand_slang(self, text: str) -> str:
        return ' '.join([self.SLANG_DICT.get(w.upper(), w) for w in text.split()])

    def _remove_emojis(self, text: str) -> str:
        if _HAS_EMOJI:
            try:
                return _emoji.demojize(text)
            except Exception:
                return text
        return text

    def _correct_spelling(self, text: str) -> str:
        if _HAS_TEXTBLOB:
            try:
                return str(_TextBlob(text).correct())
            except Exception:
                return text
        return text

    def _normalize_whitespace(self, text: str) -> str:
        return re.sub(r'\s+', ' ', text.strip())

    def _remove_numbers(self, text: str) -> str:
        return re.sub(r'\b\d+\b', '', text)

    def _remove_single_characters(self, text: str) -> str:
        return re.sub(r'\b(?![aI]\b)[a-zA-Z]\b', '', text)

    def _tokenize_text(self, text: str) -> List[str]:
        if not text.strip():
            return []
        if _HAS_NLTK:
            try:
                return _word_tokenize(text)
            except Exception:
                pass
        if self.nlp:
            try:
                return [tok.text for tok in self.nlp(text)]
            except Exception:
                pass
        return text.split()

    def _remove_stopwords(self, tokens: List[str]) -> List[str]:
        return [t for t in tokens if t.lower() not in self.stop_words]

    def _stem_tokens(self, tokens: List[str]) -> List[str]:
        return [self.stemmer.stem(t) for t in tokens] if self.stemmer else tokens

    def _lemmatize_tokens(self, tokens: List[str]) -> List[str]:
        if not tokens:
            return tokens
        if self.lemmatizer:
            try:
                return [self.lemmatizer.lemmatize(t) for t in tokens]
            except Exception:
                pass
        if self.nlp:
            try:
                doc = self.nlp(" ".join(tokens))
                return [tok.lemma_ for tok in doc]
            except Exception:
                pass
        return tokens

    # --- Main preprocessing ---
    def _preprocess_single(self, text: str, return_tokens: bool = False) -> Union[str, List[str]]:
        if not isinstance(text, str):
            text = str(text)
        if not text.strip():
            return [] if return_tokens else ''

        processed = text
        if self.config['remove_html']:
            processed = self._remove_html_tags(processed)
        if self.config['remove_urls']:
            processed = self._remove_urls(processed)
        if self.config['remove_emojis']:
            processed = self._remove_emojis(processed)
        if self.config['expand_slang']:
            processed = self._expand_slang(processed)
        if self.config['convert_lowercase']:
            processed = processed.lower()
        if self.config['correct_spelling']:
            processed = self._correct_spelling(processed)
        if self.config['remove_numbers']:
            processed = self._remove_numbers(processed)
        if self.config['remove_punctuation']:
            processed = self._remove_punctuation(processed)
        if self.config['remove_single_chars']:
            processed = self._remove_single_characters(processed)
        if self.config['normalize_whitespace']:
            processed = self._normalize_whitespace(processed)

        tokens = self._tokenize_text(processed) if self.config['tokenize'] else processed.split()
        if self.config['remove_stopwords'] and tokens:
            tokens = self._remove_stopwords(tokens)
        if tokens:
            if self.config['lemmatize_words']:
                tokens = self._lemmatize_tokens(tokens)
            elif self.config['stem_words']:
                tokens = self._stem_tokens(tokens)
        return tokens if return_tokens else ' '.join(tokens)

    def preprocess(self, text: Union[str, List[str]], return_tokens: bool = False) -> Union[str, List[str], List[List[str]]]:
        if isinstance(text, list):
            return [self._preprocess_single(t, return_tokens) for t in text]
        return self._preprocess_single(text, return_tokens)

# --- Demo ---
def demo():
    print("=== TEXT PREPROCESSOR DEMONSTRATION ===")
    basic = TextPreprocessor()
    examples = [
        "LOL this movie is GR8! 😂 Check out https://example.com BTW",
        "<p>Hello world!</p> This is a test...",
        "Numbers 1234 and single letters a i should be removed."
    ]
    for text in examples:
        print("Original:     ", text)
        print("Processed:    ", basic.preprocess(text))
        print("Tokenized:    ", basic.preprocess(text, return_tokens=True))
        print("-" * 50)

if __name__ == "__main__":
    demo()
