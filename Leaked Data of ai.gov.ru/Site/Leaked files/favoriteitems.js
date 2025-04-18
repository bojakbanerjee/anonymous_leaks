'use strict';

let favoriteItems = (function () {
    let _config = {
        selector: '[data-fav-id]',
        dataId: 'fav-id',
        apiUrl: 'other:main.othermainapi.FavoritesController.',
        activeClass: 'active',
        actionAdd: 'add',
        actionRemove: 'remove',
        linkTextAdd: '',
        linkTextRemove: '',
    }

    let busy = false;

    let init = function (items) {
        favoriteItems.loadMessage();
        $(document).on('click', _config.selector, (event) => {
            favoriteItems.action(event.currentTarget);
            event.preventDefault();
        });

        favoriteItems.markerActive(items);
    }

    let loadMessage = () => {
        _config.linkTextAdd = BX.message('PWD_MAIN_FAVORITE_ADD_ACTION');
        _config.linkTextRemove = BX.message('PWD_MAIN_FAVORITE_REMOVE_ACTION');
    };

    let markerActive = (items) => {
        items.forEach((id) => {
            $('[data-' + _config.dataId + '=' + id + ']').addClass(_config.activeClass)
                .find('span').html(_config.linkTextRemove);
        });
    };

    let action = (el) => {
        if (busy) {
            return false;
        }

        const element = $(el);
        const elId = element.data(_config.dataId);

        let action = _config.actionAdd;
        let resultText = _config.linkTextRemove;

        if (element.hasClass(_config.activeClass)) {
            action = _config.actionRemove;
            resultText = _config.linkTextAdd;
        }

        busy = true;

        BX.showWait();
        BX.ajax.runAction(_config.apiUrl + action, {
            data: {
                elId: elId,
            }
        }).then((response) => {
            BX.closeWait();
            if (response.data == true) {
                $('[data-' + _config.dataId + '=' + elId + ']').toggleClass(_config.activeClass)
                    .find('span').html(resultText);
            }
            busy = false;
        }, (response) => {
            BX.closeWait();
            console.error(response);
            busy = false;
        });
    };

    return {
        init: init,
        action: action,
        loadMessage: loadMessage,
        markerActive: markerActive,
    }
})();