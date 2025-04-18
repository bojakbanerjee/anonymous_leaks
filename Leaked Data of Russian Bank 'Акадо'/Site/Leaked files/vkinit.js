$(function() {
    !function () {
        setTimeout(function(){
            var t = document.createElement("script");
            t.type = "text/javascript", t.async = !0, t.src = "https://vk.com/js/api/openapi.js?160", t.onload = function () {
                VK.Retargeting.Init("VK-RTRG-312272-dwi0b"), VK.Retargeting.Hit()
            }, document.head.appendChild(t)

            var url = 'https://vk.com/rtrg?p=VK-RTRG-124559-eIezo';
            (window.Image ? (new Image()) : document.createElement('img')).src = url;
        },1000)

    }();
});