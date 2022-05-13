export default function decorate(block) {

    block.classList.add('phases-container');
    block.querySelectorAll(':scope > div').forEach((element,i) => {
            element.classList.add('phase-block');
            const link = document.createElement('a');
            const wrapper = document.createElement('div');
            wrapper.classList.add('phase-body');
            const items = element.querySelectorAll('div');
            items.forEach((item,i) => {
                
                if(i === 0) {
                    item.classList.add('phase-header', 'spectrum-Heading' ,'spectrum-Heading--sizeL');
                    const itemText = item.innerText;
                    link.href = item.querySelector('a').href;
                    item.innerHTML = '';
                    item.innerText = itemText;
                }
                if(i === 1) {
                    item.classList.add('icon');
                }
                if(i === 2) {
                    item.classList.add('sub-header', 'spectrum-Body', 'spectrum-Body--sizeS');
                }
                wrapper.appendChild(item);
            })

            link.append(wrapper)
            
            addDivider(element);
            element.appendChild(link);


    });
  }

  function addDivider(element) {
    const DIVIDER_IMAGE = '<img alt="quotation" src="/blocks/ddom-nav/divider_image.svg">';
    const divider = document.createElement('div');
    divider.classList.add('svg_position');
    divider.innerHTML=DIVIDER_IMAGE;
    element.prepend(divider);
  }