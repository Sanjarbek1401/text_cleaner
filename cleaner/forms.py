from django import forms

class TextCleanForm(forms.Form):
    text = forms.CharField(widget=forms.Textarea(attrs={'rows': 10, 'placeholder': 'Enter text to clean'}))
    remove_punctuation = forms.BooleanField(required=False, initial=False)
    remove_whitespace = forms.BooleanField(required=False, initial=False)
    remove_line_breaks = forms.BooleanField(required=False, initial=False)
