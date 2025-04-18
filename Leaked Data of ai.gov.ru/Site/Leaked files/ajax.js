'use strict';

let appAjax = (function () {
    let _config = {
        formSelector: '.js_filter_list',
        continerItems: 'fav-id',
        loadmoreLinkSelector: 'js_area_block',
        component: 'pwd:news.list',
    }

    let busy = false;

    let init = (component) => {
        // $(document).on('submit', _config.formSelector, (event) => {
        //     appAjax.formSubmit(event.currentTarget);
        //     event.preventDefault();
        // });

        $(document).on('change', '.js-select-change-from', (event) => {
            $(event.currentTarget).closest('form').trigger('submit');
        })

        $(document).on('click', '.js-select-ecosystem-type', (event) => {
            let url = new URL(window.location.href.split('?')[0]);
            url.searchParams.set('TYPE', $(event.currentTarget).data('value'));
            window.location.href = url.toString();
        })

        $(document).on('click', '.js-select-knowledgebase-tag', (event) => {
            let url = new URL(window.location.href.split('?')[0]);
            url.searchParams.set('tag', $(event.currentTarget).data('value'));
            url.searchParams.set('clear_cache', 'Y');
            window.location.href = url.toString();
            event.preventDefault();
        })
    };

    let formSubmit = (el) => {
        // отпрвка данных формы
    }

    let loadItems = () => {
        if (busy) {
            return false;
        }
        busy = true;

        BX.showWait();
        BX.ajax.runComponentAction(
            _config.component,
            'loadItems',
            {
                mode: 'class',
                data: {

                }
            }
        ).then((response) => {
            BX.closeWait();
            console.log(response)
            busy = false;
        }, (response) => {
            BX.closeWait();
            console.error(response);
            busy = false;
        });
    }

    return {
        init: init,
        formSubmit: formSubmit,
        loadItems: loadItems,
    }
})();

appAjax.init();