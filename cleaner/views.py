import string
from django.shortcuts import render
from .forms import TextCleanForm

def clean_text(request):
    cleaned_text = ""
    form = TextCleanForm(request.POST or None)

    if request.method == 'POST' and form.is_valid():
        text = form.cleaned_data['text']
        remove_punctuation = form.cleaned_data['remove_punctuation']
        remove_whitespace = form.cleaned_data['remove_whitespace']
        remove_line_breaks = form.cleaned_data['remove_line_breaks']

        if remove_punctuation:
            text = text.translate(str.maketrans('', '', string.punctuation))
        if remove_whitespace:
            text = text.replace(' ', '')
        if remove_line_breaks:
            text = text.replace('\n', '').replace('\r', '')

        cleaned_text = text

    return render(request, 'index.html', {'form': form, 'cleaned_text': cleaned_text})
