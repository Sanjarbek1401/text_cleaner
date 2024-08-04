function previewFile() {
    const file = document.getElementById('fileInput').files[0];
    const preview = document.getElementById('previewImage');
    const reader = new FileReader();

    reader.onloadend = function () {
        if (file.type.startsWith('image/')) {
            preview.src = reader.result;
            preview.style.display = 'block';
        } else if (file.type === 'text/plain') {
            preview.style.display = 'none';
            document.getElementById('fileText').value = reader.result;
        }
    };

    if (file) {
        reader.readAsDataURL(file);
    } else {
        preview.src = "";
    }
}

function deleteFile() {
    document.getElementById('fileInput').value = "";
    document.getElementById('previewImage').src = "";
    document.getElementById('previewImage').style.display = 'none';
    document.getElementById('fileText').value = "";
}

function cleanText() {
    var inputText = document.getElementById('inputText').value;
    var fileText = document.getElementById('fileText').value;
    var removePunctuation = document.getElementById('removePunctuation').checked;
    var removeWhitespace = document.getElementById('removeWhitespace').checked;
    var removeLineBreaks = document.getElementById('removeLineBreaks').checked;

    var textToClean = inputText + "\n" + fileText;

    fetch('http://127.0.0.1:8000/api/clean/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken') // Add this line for CSRF protection
        },
        body: JSON.stringify({
            text: textToClean,
            remove_punctuation: removePunctuation,
            remove_whitespace: removeWhitespace,
            remove_line_breaks: removeLineBreaks
        })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('outputText').value = data.cleaned_text;
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
