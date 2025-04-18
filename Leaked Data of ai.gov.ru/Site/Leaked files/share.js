let Share = {
    getParams: function (params) {
        // используем полученные параметры,
        // либо создаем пустой объект, чтобы не было ошибок
        params = params || {};
        // в качестве url используем params.url,
        // либо адрес текущей страницы (window.location.href), если params.url не указан
        params.url = params.url || window.location.href;
        // используем params.title, либо заголовок документа
        params.title = params.title || document.title;
        // и т.п.
        params.description = params.description || '';
        params.img = params.img || '';

        return params;
    },

    vkontakte: function (params) {
        params = Share.getParams(params);
        let url = 'https://vkontakte.ru/share.php?';
        url += 'url=' + encodeURIComponent(params.url);
        url += '&title=' + encodeURIComponent(params.title);
        url += '&description=' + encodeURIComponent(params.description);
        url += '&image=' + encodeURIComponent(params.img);
        url += '&noparse=true';
        Share.popup(url);
    },
    odnoklassniki: function (params) {
        params = Share.getParams(params);
        let url = 'https://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1';
        url += '&st.comments=' + encodeURIComponent(params.description);
        url += '&st._surl=' + encodeURIComponent(params.url);
        Share.popup(url);
    },
    facebook: function (params) {
        params = Share.getParams(params);
        let url = 'https://www.facebook.com/sharer.php?s=100';
        url += '&p[title]=' + encodeURIComponent(params.title);
        url += '&p[summary]=' + encodeURIComponent(params.description);
        url += '&p[url]=' + encodeURIComponent(params.url);
        url += '&p[images][0]=' + encodeURIComponent(params.img);
        Share.popup(url);
    },
    twitter: function (params) {
        params = Share.getParams(params);
        let url = 'https://twitter.com/share?';
        url += 'card=summary_large_image';
        url += '&text=' + encodeURIComponent(params.title);
        url += '&url=' + encodeURIComponent(params.url);
        url += '&counturl=' + encodeURIComponent(params.url);
        url += '&image=' + encodeURIComponent(params.img);
        Share.popup(url);
    },
    mailru: function (params) {
        params = Share.getParams(params);
        let url = 'https://connect.mail.ru/share?';
        url += 'url=' + encodeURIComponent(params.url);
        url += '&title=' + encodeURIComponent(params.title);
        url += '&description=' + encodeURIComponent(params.description);
        url += '&imageurl=' + encodeURIComponent(params.img);
        Share.popup(url)
    },

    tg: function (params) {
        params = Share.getParams(params);
        let url = 'https://telegram.me/share/url?';
        url += 'url=' + encodeURIComponent(params.url);
        url += '&text=' + encodeURIComponent(params.title);
        Share.popup(url)
    },

    wa: function (params) {
        params = Share.getParams(params);
        let url = 'https://api.whatsapp.com/send?';
        url += 'text=' + encodeURIComponent(params.title);
        url += ' ' + encodeURIComponent(params.url);
        Share.popup(url)
    },

    copy: function (params) {
        params = Share.getParams(params);
        navigator.clipboard.writeText(params.title + ' ' + params.url).then(() => {
            alert('Copied');
        }).catch(err => {
            prompt(params.title, params.url);
        });
    },

    popup: function (url) {
        window.open(url, '', 'toolbar=0,status=0,width=626,height=436');
    }
};