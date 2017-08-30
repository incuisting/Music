import 'normalize.css'
import '../css/reset.css'
import '../css/index.scss';

import $ from 'jquery';

$(function () {
    $.get('../../server/songs.json').then(function (response) {
        let items = response
        items.forEach(i => {
            let $li = $(
                `
                <li>
                <a href="./song.html?id=${i.id}">
                <h3>${i.name}</h3>
                <p>演唱者-专辑</p>
                <svg class="play">
                <use xlink:href="#icon-play-circled"></use>
                </svg>
                </a>
                </li>
                `
            )
            $('#lastsetMusic').append($li)
        })
        $('#lastestMusicLoading').remove()
    })
})

