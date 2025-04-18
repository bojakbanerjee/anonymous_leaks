BX.ready(function () {
    $('.stories-modal-js').on('click', function (e) {
        BX.ajax.runAction('other:main.othermainapi.StoriesController.saveView', {
            data: {
                id: $(this).attr('data-id')
            }
        }).then((response) => {
            if (true === response.data) {

            }
        }, (response) => {
            console.error(response);
        });
    });

    $('.js-post-history').on('click', function (e) {
        let data = {
            'query': $(this).attr('data-query'),
            'entity_id': Number($(this).attr('data-id')),
            'entity_link': $(this).attr('href'),
            'user_id': Number(BX.message('USER_ID'))
        };

        fetch(`${window.searchApiUrl}user_history/entity`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
            }
        }).then(function(response) {
            
        }).catch(error => {
            console.log(error);
        });

    });

    $(".js-change-type").change(function() {
        let prevUrl = new URL(window.location.href);
        let isEducation = prevUrl.searchParams.get('education');
        if (!isEducation) {
            isEducation = 'N'
        }
        if (isEducation !== $(this).find(':selected').data('education')) {
            let url = new URL(window.location.href.split('?')[0]);
            url.searchParams.set('education', $(this).find(':selected').data('education'));
            window.location.href = url.toString();
        }
    });

    if (0 < $('#searchInput').length) {
        let timer;
        $('#searchInput').on('keyup', (event) => {
            let query = $('#searchInput').val();

            if (2 < query.length) {
                clearTimeout(timer);
                timer = setTimeout(() => {
                    autocomplete(query);
                }, 700);
            }
        });
    }

    if (0 < $('#russian-map-0').length) {
        BX.ajax.runAction('other:main.othermainapi.EcosystemController.getMap', {
            data: {
                type: $('#russian-map-0').attr('data-type')
            }
        }).then((response) => {
            new RussianMap({
                viewPort: response.data.viewPort,
                mapId: 'russian-map-0',
                width: 1240,
                height: 690,
                // дефолтовые атрибуты для контуров регионов
                defaultAttr: {
                    fill: '#fff', // цвет которым закрашивать
                    stroke: '#D4D9FF', // цвет границы
                    'stroke-width': 1, // ширина границы
                    'stroke-linejoin': 'round' // скруглять углы
                },
                mouseMoveAttr: {
                    fill: '#3C50B2'
                },
                onMouseMove: function (event) {
                    var tooltip = document.querySelector('.ecosystemMap__tooltip');
                    var title = document.querySelector('.ecosystemMap__tooltip .title');
                    var count = document.querySelector('.ecosystemMap__tooltip .count');
                    tooltip.classList.add('ecosystemMap__tooltip_show');
                    tooltip.style.top = `${event.y}px`;
                    tooltip.style.left = `${event.x}px`;
                    title.textContent = this.region.name;
                    count.textContent = this.region.count;
                },
                onMouseOut: function (event) {
                    var tooltip = document.querySelector('.ecosystemMap__tooltip');
                    var title = document.querySelector('.ecosystemMap__tooltip .title');
                    var count = document.querySelector('.ecosystemMap__tooltip .count');
                    tooltip.classList.remove('ecosystemMap__tooltip_show')
                    title.textContent = '';
                },
                onMouseClick: function (event) {
                    let prevUrl = new URL(window.location.href);
                    let type = prevUrl.searchParams.get('TYPE');
                    if (type === null) {
                        type = document.querySelector('[name="TYPE"]').value;
                    }
                    let url = new URL(window.location.href.split('?')[0]);
                    url.searchParams.set('TYPE', type);
                    url.searchParams.delete('REGION');
                    url.searchParams.set('REGION', this.region.ident);
                    window.location.href = url.toString();
                }
            }, response.data.regions);
        }, (response) => {
            console.error(response);
        });
    }

    if (0 < $('#russian-map-1').length) {
        BX.ajax.runAction('other:main.othermainapi.EcosystemController.getMap', {
            data: {
                type: $('#russian-map-1').attr('data-type')
            }
        }).then((response) => {
            new RussianMap2({
                viewPort: response.data.viewPort,
                mapId: 'russian-map-1',
                width: 1240,
                height: 690,
                // дефолтовые атрибуты для контуров регионов
                defaultAttr: {
                    fill: '#fff', // цвет которым закрашивать
                    stroke: '#D4D9FF', // цвет границы
                    'stroke-width': 1, // ширина границы
                    'stroke-linejoin': 'round' // скруглять углы
                },
                mouseMoveAttr: {
                    fill: '#5ca2b2'
                },
                onMouseMove: function(event) {
                    var tooltip_2 = document.querySelector('.ecosystemMap__tooltip_2');
                    var title_2 = document.querySelector('.ecosystemMap__tooltip_2 .title_2');
                    var count_2 = document.querySelector('.ecosystemMap__tooltip_2 .count_2');
                    tooltip_2.classList.add('ecosystemMap__tooltip_show');
                    tooltip_2.style.top = `${event.y}px`;
                    tooltip_2.style.left = `${event.x}px`;
                    title_2.textContent = this.region.name;
                    count_2.textContent = this.region.count;
                },
                onMouseOut: function(event) {
                    var tooltip_2 = document.querySelector('.ecosystemMap__tooltip_2');
                    var title_2 = document.querySelector('.ecosystemMap__tooltip_2 .title_2');
                    var count_2 = document.querySelector('.ecosystemMap__tooltip_2 .count_2');
                    tooltip_2.classList.remove('ecosystemMap__tooltip_show')
                    title_2.textContent = '';
                },
                onMouseClick: function(event) {
                    let prevUrl = new URL(window.location.href);
                    let type = prevUrl.searchParams.get('TYPE');
                    if (type === null) {
                        type = document.querySelector('[name="TYPE"]').value;
                    }
                    let url = new URL(window.location.href.split('?')[0]);
                    url.searchParams.set('TYPE', type);
                    url.searchParams.delete('REGION');
                    url.searchParams.set('REGION', this.region.ident);
                    window.location.href = url.toString();
                }
            }, response.data.regions);
        }, (response) => {
            console.error(response);
        });
    }
    if (0 < $('#russian-map-2').length) {
        BX.ajax.runAction('other:main.othermainapi.EcosystemController.getMap', {
            data: {
                type: $('#russian-map-2').attr('data-type')
            }
        }).then((response) => {
            new RussianMap3({
                viewPort: response.data.viewPort,
                mapId: 'russian-map-2',
                width: 1240,
                height: 690,
                // дефолтовые атрибуты для контуров регионов
                defaultAttr: {
                    fill: '#fff', // цвет которым закрашивать
                    stroke: '#D4D9FF', // цвет границы
                    'stroke-width': 1, // ширина границы
                    'stroke-linejoin': 'round' // скруглять углы
                },
                mouseMoveAttr: {
                    fill: '#5f5eb7'
                },
                onMouseMove: function(event) {
                    var tooltip = document.querySelector('.ecosystemMap__tooltip_3');
                    var title = document.querySelector('.ecosystemMap__tooltip_3 .title_3');
                    var count = document.querySelector('.ecosystemMap__tooltip_3 .count_3');
                    tooltip.classList.add('ecosystemMap__tooltip_show');
                    tooltip.style.top = `${event.y}px`;
                    tooltip.style.left = `${event.x}px`;
                    title.textContent = this.region.name;
                    count.textContent = this.region.count;
                },
                onMouseOut: function(event) {
                    var tooltip = document.querySelector('.ecosystemMap__tooltip_3');
                    var title = document.querySelector('.ecosystemMap__tooltip_3 .title_3');
                    var count = document.querySelector('.ecosystemMap__tooltip_3 .count_3');
                    tooltip.classList.remove('ecosystemMap__tooltip_show')
                    title.textContent = '';
                },
                onMouseClick: function(event) {
                    let prevUrl = new URL(window.location.href);
                    let type = prevUrl.searchParams.get('TYPE');
                    if (type === null) {
                        type = document.querySelector('[name="TYPE"]').value;
                    }
                    let url = new URL(window.location.href.split('?')[0]);
                    url.searchParams.set('TYPE', type);
                    url.searchParams.delete('REGION');
                    url.searchParams.set('REGION', this.region.ident);
                    window.location.href = url.toString();
                }
            }, response.data.regions);
        }, (response) => {
            console.error(response);
        });
    }
})

function autocomplete(query) {
    let variants = $('.searchInfo_variants');
    let commonRequests = $('.searchInfo_commonRequests');
    let variantsContainer = $('.variants_tags');
    let commonRequestContainer = $('.commonRequests_tags');
    BX.ajax({
        url: `${window.searchApiUrl}autocomplete/?query=${query}`,
        method: 'GET',
        async: true,
        cache: false,
        contentType: 'application/json',
        onsuccess: (result) => {
            let response = JSON.parse(result);
            if (0 < response.length) {
                variants.css('display', 'flex');
                let tags = '';
                let url = new URL(window.location.href.split('?')[0]).toString();
                for (let i in response) {
                    tags += `<a class='searchInfo__tag' href='${url}search/?q=${response[i]}'>${response[i]}</a>`;
                }
                variantsContainer.html(tags);
            } else {
                variants.css('display', 'none');
                variantsContainer.html('');
            }
        },
        onfailure: (result) => {
            console.log(result);
        }
    });
}