document.addEventListener('DOMContentLoaded', (event) => {

    // alert('loaded')

    let items = document.querySelectorAll('.box');

    items.forEach(function(item) {
      
      let borderColor = getRandomColor()
      item.style.backgroundColor = borderColor
      item.style.borderColor = borderColor
      item.addEventListener('dragstart', handleDragStart);
      item.addEventListener('dragover', handleDragOver);
      item.addEventListener('dragenter', handleDragEnter);
      item.addEventListener('dragend', handleDragEnd);
      item.addEventListener('dragleave', handleDragLeave);
    });
    
    let tds = document.querySelectorAll('td');
    tds.forEach((td)=>{
      td.addEventListener('drop', handleDrop);
    })

    function handleDragStart(e) {
      // this.style.opacity = '0.4';
      console.log('selectedElement: ', e.target)
      let selectedElementParent = e.target.parentElement
      e.dataTransfer.setData("boxId", e.target.id);
      e.dataTransfer.setData("tdId", selectedElementParent.id);
    }
  
    function handleDragEnd(e) {
      this.style.opacity = '1';
  
      items.forEach(function (item) {
        item.classList.remove('over');
      });
    }
  
    function handleDragOver(e) {
      e.preventDefault();
    }
    
    function handleDragEnter(e) {
      e.target.classList.add('over');
    }

    function handleDragLeave(e) {
      e.target.classList.remove('over');
    }

    function handleDrop(e){
      e.preventDefault();
      const boxData = e.dataTransfer.getData("boxId");
      const tableData = e.dataTransfer.getData("tdId");

      console.log('data: ',boxData)
      console.log('data2: ',tableData)
      let destinationDiv = e.target
      console.log('destination e.target: ', e.target)
      let parent = e.target.parentElement

      if (parent.id === tableData ){   //edge case - if box dropped to same td
        alert('You are dropping on same box. Drop to different co-ordinate!')
        return
      }
      console.log('parent: ', parent)
      e.target.remove()
      parent.appendChild(document.getElementById(boxData));

      let sourceDiv = document.getElementById(tableData)
      console.log('sourceDiv: ', sourceDiv)
      sourceDiv.appendChild(destinationDiv)
    }
  
    function getRandomColor() {
      let random =  Math.floor(Math.random()*360 )
      return `hwb(${random}deg 20% 0%)`
    }

    function undoLast() {
      
    }
  });