const headings = document.querySelectorAll('h1,h2,h3,h4,h5,h6');
const contents = document.getElementById('contents');
const elements = [];

const setObserver = (li, heading) => {
  const intersectCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        li.classList.add('active');
      } else {
        li.classList.remove('active');
      }
    });
  };

  const options = {
    //rootMargin:"-1% 0px -99% 0px",
    rootMargin: "-30% 0px -70% 0px",
    threshold: 0
  };
  const observer = new IntersectionObserver(intersectCallback, options);
  observer.observe(heading.parentNode);
}

headings.forEach((ele, index) => {

  if (index === 0) {
    const li = document.createElement('li');
    li.innerText = ele.innerText;
    contents.appendChild(li);
    elements.push(li);
    li.addEventListener('click', () => junmpHeading(ele));
    setObserver(li, ele);
    return
  }

  const headingNum = parseInt(ele.tagName.substring(1));
  const beforeHeadingNum = parseInt(headings[index - 1].tagName?.substring(1));
  let parent = elements[elements.length - 1].parentNode;
  let element;
  const li = document.createElement('li');

  if (headingNum > beforeHeadingNum) {
    const ul = document.createElement('ul');
    li.innerText = ele.innerText;
    ul.appendChild(li);
    element = ul;
    parent.appendChild(ul);
    elements.push(li);
    li.addEventListener('click', () => junmpHeading(ele));
    setObserver(li, ele);
    return
  }

  if (headingNum < beforeHeadingNum) { //小さい
    [...Array(beforeHeadingNum - headingNum)].forEach(() => {
      parent = parent.parentNode;
    })
    li.innerText = ele.innerText;
    element = li;
  } else if (headingNum === beforeHeadingNum) { //同じ
    li.innerText = ele.innerText;
    element = li;
  }
  li.addEventListener('click', () => junmpHeading(ele));
  parent.appendChild(element);
  elements.push(element);
  setObserver(li, ele);

})

const junmpHeading = (ele) => {
  ele.scrollIntoView({ behavior: "smooth" });
}
