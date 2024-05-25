function navigationBar(evt, menuName) {
    var i, navbar_links, navbar_content;
    navbar_content = document.getElementsByClassName("navbar_content");
    for (i = 0; i < navbar_content.length; i++) {
        navbar_content[i].style.display = "none";
    }
    navbar_links = document.getElementsByClassName("navbar_links");
    for (i = 0; i < navbar_links.length; i++) {
        navbar_links[i].className = navbar_links[i].className.replace(" navbar_active", "");
    }
    document.getElementById(menuName).style.display = "flex";
    evt.currentTarget.className += " navbar_active";
}

document.getElementById("defaultOpen").click();

function myMove() {
  var elem = document.getElementById("whale1");   
  var pos = 500;
  var id = setInterval(frame, 10);
  function frame() {
      pos--;
      pos--; 
      elem.style.left = pos + 'px';
      elem.style.top = 300 + 25 * Math.sin(pos/ (180 / Math.PI)) + 'px';
      console.log(getWidth())
      if (pos < -330) {
        pos = getWidth();
      }
  }
}

myMove();

function getWidth() {
    if (self.innerWidth) {
      return self.innerWidth;
    }
  
    if (document.documentElement && document.documentElement.clientWidth) {
      return document.documentElement.clientWidth;
    }
  
    if (document.body) {
      return document.body.clientWidth;
    }
  }