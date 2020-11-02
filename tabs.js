(function() {
    var showTab = function (a, animations) {
        if (animations === undefined) {
            animations = true
        }
        var li = a.parentNode
        var div = a.parentNode.parentNode.parentNode
        var activeContent = div.querySelector('.tab-content.active')
        var contentToDisplay = div.querySelector(a.getAttribute('href'))

        if(li.classList.contains('active')){
            return false
        }
        div.querySelector('.tabs .active').classList.remove('active')
        li.classList.add('active')

        if (animations) {
            activeContent.classList.add('fade')
            activeContent.classList.remove('in')
            var transitionend = function () {
                this.classList.remove('fade')
                this.classList.remove('active')
                contentToDisplay.classList.add('active')
                contentToDisplay.classList.add('fade')
                contentToDisplay.offsetWidth
                contentToDisplay.classList.add('in')
                this.removeEventListener('transitionend', transitionend)
                this.removeEventListener('webkitTransitionEnd', transitionend)
                this.removeEventListener('oTransitionEnd', transitionend)
                this.removeEventListener('mozTransitionEnd', transitionend)
            }
            activeContent.addEventListener('transitionend', transitionend)
            activeContent.addEventListener('webkitTransitionEnd', transitionend)
            activeContent.addEventListener('oTransitionEnd', transitionend)
            activeContent.addEventListener('mozTransitionEnd', transitionend)
        } else {
            contentToDisplay.classList.add('active')
            activeContent.classList.remove('active')
        }
    }

    var tabs = document.querySelectorAll('.tabs a')
    for (var i = 0; i < tabs.length; i++){
        tabs[i].addEventListener('click', function (e) {
            showTab(this)
        })
    }

    var hashChange = function (e) {
        var hash = window.location.hash
        var a = document.querySelector('a[href="' + hash + '"]')
        if (a !== null && !a.classList.contains('active')) {
            showTab(a, e !== undefined)
        }
    }

    window.addEventListener('hashchange', hashChange)
    hashChange()
})()