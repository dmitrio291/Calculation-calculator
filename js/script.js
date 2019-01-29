let total = 5000, // это такая глобальная переменная значение нашей общей стоимости
	time = 1, // переменная времени, т.е сколько часов мы затратим на этот проект
	hourRate, // стоимость вашего часа
	tabLeft = document.querySelector('.tabs__left'), // здесь мы отображаем нашу 1-ую вкладку с лендингом. При помощи этой структуры мы получили 1-ый элемент с классом .tab__left на нашей страницы
	// document обозначает то, что мы что-то ищем в нашем (html)документе
	// querySelector() - этот метод получает что-то по css селектору
	tabRight = document.querySelector('.tabs__right'),
	blocksBlock = document.getElementById('blocks-block'), // получаем нужный нам элемент по id
	pagesBlock = document.getElementById('pages-block'),
	counterBlock = document.getElementById('counter-block'),
	counterPages = document.getElementById('counter-pages'),
	counterHours = document.getElementById('counter-hours'),
	counterRate = document.getElementById('counter-rate'),
	changesCheck = document.getElementById('changes-check'),
	cmsCheck = document.getElementById('cms-check'),
	totalValue = document.getElementsByClassName('total__count')[0], 
	// getElementsByClassName() находит сразу несколько элемнтов
	// [0] означает что мы обращаемся только к 1-му элементу у которого порядковый номер начинается с нуля
	input = document.getElementsByTagName('input'); // находим все элементы по названию тега

const land = 5000, // цена за лендинг
	  corp = 12000, // цена за корпоративный сайт
	  cms = 4000, // стоимость посадки нашей страницы на cms
	  changes = 1000, // дополнительная возможность редатикровать текст на сайте
	  blocks = 500, // здесь мы записываем ту сумму, которую хотим брать за каждый отдельный блок
	  pages = 2500; // здесь будет та сумма, которую мы будем брать за одну страницу

// Все скрипты, которые мы напишим внутри этой ф-ии будут работать только тогда, когда загрузилась структура нашего документа
// Обработчик события - ф-ия, которя берет какой-то элемент например наше окно и добавляет ему какое-то событие допустим клик
window.addEventListener('DOMContentLoaded', function() {

	tabLeft.addEventListener('click', () => {

		// Объявляем техническую переменную, которая будет изменяться во время цикла. Мы эту переменную сравниваем с каким-то значением
		// С помощью св-ва length узнаем кол-во элементов input на странице
		// и увеличивем каждый шаг на 1
		for (let i = 0; i < input.length; i++) {
			// В квадратных скобках указываем каждое повторение цикла мы берем каждый раз новый input по порядку и очищаем его
			input[i].value = '';
		}

		blocksBlock.style.display = 'flex';
		pagesBlock.style.display = 'none';

		tabLeft.classList.add('active'); 
		tabRight.classList.remove('active');
		// classList - св-во, которое позволяет нам удалять, добавлять, изменять или проверять наличие каких-то классов

		// Если чекбокс у нас отмечен, то при клике на какой-то таб он будет не отмечен
		if (changesCheck.checked) {
			changesCheck.checked = false
		};

		if (cmsCheck.checked) {
			cmsCheck.checked = false
		};

		total = land; // Мы можем переключатся между вкладками туда сюда и чтобы код нам автоматически подставлял 5000 мы прописываем такую строчку
		totalValue.value = total; // Для инпута с классом total__count добавляем общую стоимость

	}); // добавляем обработчик события для элемента с классом .tabs__left

	tabRight.addEventListener('click', () => {

		for (let i = 0; i < input.length; i++) {
			input[i].value = '';
		}

		blocksBlock.style.display = 'none'; // скрываем кол-во блоков
		pagesBlock.style.display = 'flex'; // показываем кол-во страниц

		tabRight.classList.add('active');
		tabLeft.classList.remove('active'); 

		if (changesCheck.checked) {
			changesCheck.checked = false
		};

		if (cmsCheck.checked) {
			cmsCheck.checked = false
		};

		total = corp; 
		totalValue.value = total; 

	});

	// когда наш input будет изменяться у нас будет срабатывать это событие
	counterBlock.addEventListener('change', () => {
		counterHours.value = '';
		counterRate.value = '';
		// посчитали сколько будет общая стоимость в зависимости от того сколько блоков ввел пользователь
		total = counterBlock.value * blocks; // то, что ввел пользователь мы умножаем на стоимость одного блока
		totalValue.value = total; // записываем результат вычисления в input c классом .total__count
	});

	counterPages.addEventListener('change', () => {
		counterHours.value = '';
		counterRate.value = '';
		// посчитали сколько будет общая стоимость в зависимости от того сколько страниц ввел пользователь
		total = counterPages.value * pages; // то, что ввел пользователь мы умножаем на стоимость одной страницы
		totalValue.value = total; // записываем результат вычисления в input c классом .total__count
	});

	counterHours.addEventListener('change', () => {
		counterBlock.value = '';
		counterPages.value = '';
		total = 0; // Обнуляем общую стоимость
		time = counterHours.value; // В переменную time записываем введенное значение поля input
		hourRate = time * counterRate.value; // кол-во часов умножаем на то, что ввел ползователь в поле input c id="counter-rate"
		totalValue.value = hourRate; // результат вычисления записываем в поле input c классом .total__count
		total = hourRate; // результат вычисления записываем в общую стоимость в переменную total
	});

	counterRate.addEventListener('change', () => {
		counterBlock.value = '';
		counterPages.value = '';
		total = 0;
		hourRate = time * counterRate.value;
		totalValue.value = hourRate; 
		total = hourRate; 
	});

	// Дополнительная возможность редактирования текста на сайте
	changesCheck.addEventListener('change', () => {
		// если чекбокс отмечен
		if (changesCheck.checked) { 
			total += changes; // к общей стоимости мы прибавляем в нашем случае цену за возможность редактировать текст на сайте 1000 рублей
			totalValue.value = total;
		// если чекбокс не отмечен, то мы должны отнять эту переменную changes из общей суммы
		} else { 
			total -= changes;
			totalValue.value = total;	
		}
	});

	// Дополнительная возможность посадки страницы на cms
	cmsCheck.addEventListener('change', () => {
		// если чекбокс отмечен
		if (cmsCheck.checked) { 
			total += cms; // к общей стоимости мы прибавляем в нашем случае цену за посадку страницы на cms 4000 рублей
			totalValue.value = total;
		// если чекбокс не отмечен, то мы должны отнять эту переменную cms из общей суммы
		} else { 
			total -= cms;
			totalValue.value = total;	
		}
	});

	// задаем техническую переменную i, вычисляем кол-во инпутов, которые у нас есть на странице и увеличиваем каждый раз на 1
	for (let i = 0; i < input.length; i++) {
		// каждому инпуту на странице мы будем добавлять какое-то событие
		input[i].addEventListener('keydown', (event) => { // event - объект события. Он содержит в себе инф-ию о том, на чем происходит событие или какое событие вообще происходит
			// Чтобы быть точно уверенным, что мы какое-то действие выполняем только над тем элементом, на который мы кликнули или который сейчас заполняется мы можем вочпользоватся конструкции event.target
			event.target.classList.toggle('blink'); // cвойство event.target содержит элемент, на котором сработало событие. C помощью конструкции event.target мы вернем тот input, который заполняется
		});
	}

	// задаем техническую переменную i, вычисляем кол-во инпутов, которые у нас есть на странице и увеличиваем каждый раз на 1
	for (let i = 0; i < input.length; i++) {
		// каждому инпуту на странице мы будем добавлять какое-то событие
		input[i].addEventListener('keyup', (event) => { // event - объект события. Он содержит в себе инф-ию о том, на чем происходит событие или какое событие вообще происходит
			// Чтобы быть точно уверенным, что мы какое-то действие выполняем только над тем элементом, на который мы кликнули или который сейчас заполняется мы можем вочпользоватся конструкции event.target
			event.target.classList.toggle('blink'); // cвойство event.target содержит элемент, на котором сработало событие. C помощью конструкции event.target мы вернем тот input, который заполняется
		});
	}

});
