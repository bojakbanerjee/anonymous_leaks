'use strict';

let paginationGrid = (() => {
    let init = function (event) {

        let prefix = $(event.currentTarget).data('block-target');
        let url = $(event.currentTarget).attr('href');
        let continer = $('.' + prefix);
        let continerPagination = $(event.currentTarget).closest('div');

        BX.showWait();
        BX.ajax({
            url: url,
            method: 'GET',
            async: true,
            cache: false,
            onsuccess: (result) => {
                continerPagination.html('');
                let items = $('<div>' + result + '</div>');
                continer.append(items.find('.' + prefix).html());
                continerPagination.html(items.find('[data-block-target]').closest('div').html())
                BX.closeWait();
            },
            onfailure: (result) => {
                console.log(result);
                BX.closeWait();
            }
        });
        event.stopPropagation();
        return false;
    }

    return {
        init: init,
    }
})();

BX.ready(() => {
    $(document).on('click', '[data-block-target]', paginationGrid.init);
})