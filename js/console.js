var consoleEx = (function () {
    var following = true,
        pre = document.createElement('pre'),
        code = document.createElement('code'),
        div = null;

    return {
        init: init,
        clear: clear,
        follow: follow,
        inline: progress.bind(this, 'progress'),
        log: print.bind(this, 'debug'),
        info: print.bind(this, 'info'),
        warn: print.bind(this, 'warn'),
        error: print.bind(this, 'error')
    };

    function init(_div) {
        div = _div;
        pre.appendChild(code);
        div.appendChild(pre);
    }

    function clear() {
        while (code.hasChildNodes()) {
            code.removeChild(code.lastChild);
        }
    }

    function follow() {
        following = true;
    }

    function print(className, object) {
        var s = (typeof object === 'string') ? object : JSON.stringify(object),
            span = document.createElement('span'),
            text = document.createTextNode(s + '\n');

        var lastProgSpan = null;
        var x = code.querySelectorAll("span");
        if (x.length > 0) {
            if (x[x.length - 1].classList.contains("progress"))
                lastProgSpan = x[x.length - 1];
        }
        if (lastProgSpan !== null)
            lastProgSpan.textContent += "\n";

        span.setAttribute('class', className);
        span.appendChild(text);
        code.appendChild(span);

        if (following) {
            scrollToBottom();
        }
    }

    function progress(className, object) {
        var string = (typeof object === 'string') ? object : JSON.stringify(object),
            span = document.createElement('span'),
            text = document.createElement('span');

        var lastProgSpan = null;
        var x = code.querySelectorAll("span");
        if (x.length > 0) {
            if (x[x.length - 1].classList.contains("progress"))
                lastProgSpan = x[x.length - 1];
        }
        if (lastProgSpan !== null)
            lastProgSpan.textContent = string;
        else {
            text.textContent = string;
            text.setAttribute('class', className + " info");
            span.appendChild(text);
            code.appendChild(span);
        }
        if (following) {
            scrollToBottom();
        }
    }

    function scrollToBottom() {
        window.scrollTo(0, document.body.scrollHeight);
    }
}());