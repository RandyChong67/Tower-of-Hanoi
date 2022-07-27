(function () {
    var blocks = {
            1: {
                width: '28vw',
                bottom: '4vh',
                color: 'rgb(0, 61, 153)'
            },
            2: {
                width: '22vw',
                bottom: '9vh',
                color: 'rgb(0, 82, 204)'
            },
            3: {
                width: '16vw',
                bottom: '14vh',
                color: 'rgb(0, 102, 255)'
            }
        },
        $left_rod = $('#Left\\.id'),
        $columns = $('.Column\\.cls'),
        $prev_col,
        moves = 0,
        $move_count = $('#Move\\.id'),
        $hours = $('#Hours\\.id'),
        $mins = $('#Minutes\\.id'),
        $sec = $('#Seconds\\.id'),
        hours = 0,
        mins = 0,
        sec = 0,
        is_start = false,
        timer;

    _.each(blocks, function (block, index) {
        var $block = $('<div class="Block.cls" draggable="true" id="Block' + index + '.id" data-value="' + index + '">' +
                '<div class="InnerBlock.cls"></div>' + '</div>'),
            $inner = $block.children('.InnerBlock\\.cls');
        $inner.css('width', block.width)
            .css('background-color', block.color);
        $block.css('bottom', block.bottom);

        $block.on('dragstart', function (e) {
            this.style.opacity = '0.4';
            $prev_col = $(e.currentTarget.parentNode);

            if ($(this).attr('data-value') === $prev_col.attr('data-value')) {
                e.originalEvent.dataTransfer.effectAllowed = 'move';
                e.originalEvent.dataTransfer.setData('text', e.target.id);

                if (!is_start) {
                    is_start = true;
                    startTimer();
                }
            }
        })
            .on('dragend', function (e) {
                this.style.opacity = '1';
                if ($prev_col) { setColIndex($prev_col); }
            });

        $left_rod.append($block);
    });

    _.each($columns, function (column) {
        var $column = $(column);

        $column.on('dragover', function (e) {
            e.preventDefault();
        })
            .on('drop', function (e) {
                var data = e.originalEvent.dataTransfer.getData('text');

                if (data) { dropBlock($column, e); }
                setColIndex($column);
            });

        setColIndex($column);
    });

    function setColIndex($column) {
        var block_list = $column.children('.Block\\.cls');

        $column.attr('data-value', '0');

        if (block_list.length > 0) {
            _.each(block_list, function (block) {
                var index = $(block).attr('data-value');

                if ($column.attr('data-value') < index) {
                    $column.attr('data-value', index);
                }
            });
        }
    }

    function dropBlock($column, e) {
        var block_list = $column.children('.Block\\.cls'),
            data = e.originalEvent.dataTransfer.getData('text'),
            $block = $('#' + data.replace('.id', '\\.id'));

        if ($block.attr('data-value') >= $column.attr('data-value') &&
            $column.attr('id') !== $prev_col.attr('id')) {
            $block.css('bottom', '' + (4 + (5 * block_list.length)) + 'vh');
            e.preventDefault();
            e.currentTarget.appendChild(document.getElementById(data));
            moves++;
            $move_count.html('Move: ' + moves);
        }
    }
    
    function startTimer() {
        timer = setTimeout(function () {
            sec++;
            if (sec > 59) {
                sec = 0;
                mins++;
                if (mins > 59) {
                    mins = 0;
                    hours++;
                }
            }
            updateTime($hours, hours);
            updateTime($mins, mins);
            updateTime($sec, sec);

            startTimer();
        }, 1000);

        function updateTime($time, time) {
            if (time < 10) { $time.text($time.attr('id') === 'Seconds.id' ? '0' + time : '0' + time + ':'); }
            else { $time.text($time.attr('id') === 'Seconds.id' ? time : time + ':'); }
        }
    }
})();