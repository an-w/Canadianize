const excludedTags = ['STYLE', 'CODE', 'SCRIPT', 'NOSCRIPT'];

const dict = {
    'color': 'colour',
    'center': 'centre'
};

replaceText(document.body);

function replaceText(element) {
    if (excludedTags.includes(element.tagName)) return;

    if (element.hasChildNodes()) {
        element.childNodes.forEach(replaceText)
    } else if (element.nodeType === Text.TEXT_NODE) {
        Object.keys(dict).forEach(word => {
            replaceWord(element, word);
        });
    }
}

function isMono(element) {
    return !!getComputedStyle(element.parentElement).getPropertyValue('font-family').match(/monospace/gi);
}

function replaceWord(element, word) {
    const re = new RegExp(word, 'gi');
    if (element.textContent.match(re) && !isMono(element)) {
        const newElement = document.createElement('span');
        newElement.innerHTML = element.textContent.replace(re, matchCaseReplacer(word));
        element.replaceWith(newElement);
    }
}

function matchCaseReplacer(word) {
    const newWord = dict[word];
    return match => {
        if (match === word.toUpperCase()) {
            // uppercase
            return newWord.toUpperCase();
        } else if (match === word.charAt(0).toUpperCase() + word.slice(1)) {
            // capitalized
            return newWord.charAt(0).toUpperCase() + newWord.slice(1);
        }
        return newWord;
    };
}