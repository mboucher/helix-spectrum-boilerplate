export default function decorate(block) {
    block.classList.add('help-wrapper');
    const wrapper = document.createElement('div');
    wrapper.classList.add('article-cards');
    const heading = document.createElement('h3');
    heading.innerText = "Help Resources";

    block.querySelectorAll(':scope > div').forEach(element => {
        element.classList.add('article-card');
        const href = element.querySelector('a').href;
        const cardHeading = element.querySelector('h3');
        const headingText = cardHeading.innerText;
        cardHeading.innerHTML = "";
        cardHeading.innerText = headingText;
        element.querySelectorAll('p').forEach(item => {
            item.classList.add('spectrum-Body', 'spectrum-Body--sizeS');
        })
        const link = document.createElement('a');
        link.href = href;
        link.append(element);
      
        wrapper.append(link);
    })
    block.innerText="";
    block.append(heading);
    block.append(wrapper);



}