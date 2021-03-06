let bands;
fetch('http://localhost:7000/bands-content.json')
    .then(response => response.json())
    .then(data => {
        bands = data[decade];
        fillPage();
    })
    .catch(error => {
        console.error('There was an error: ', error);
        fillErrorPage();
    });

const imageWithAttributes = (band) => {
    const img = document.createElement('img');
    const src = document.createAttribute('src');
    const alt = document.createAttribute('alt');
    src.value = band.img;
    alt.value = band.alt;
    img.setAttributeNode(src);
    img.setAttributeNode(alt);
    return img;
};

function fillPage(){
    document.querySelector('.decade-title').textContent = bands.title;
    document.querySelector('.decade-title').textContent = bands.subtitle;
    const bandTitles = document.querySelectorAll('.band-title');
    const bandImgContainers = document.querySelectorAll('.band-img-container');
    const bandTexts = document.querySelectorAll('.band-body');
    bands.bands.forEach((band, idx) => {
        bandTitles[idx].textContent = band.name;
        bandImgContainers[idx].append(imageWithAttributes(band));
        const text = document.createTextNode(band.text);
        bandTexts[idx].append(text);
    });
}

function fillErrorPage(){
    const errorTextNode = document.createElement('h2');
    const errorText = document.createTextNode('Mhmmm, creo que no pude encontrar bandas de esta década. Probá en un rato!');
    errorTextNode.append(errorText);
    document.querySelector('footer').insertAdjacentElement('beforebegin', errorTextNode);
}
