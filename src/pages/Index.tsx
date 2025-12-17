import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

type GameMode = 'menu' | 'playing';
type Category = 'random' | 'trust' | 'intimacy' | 'adult' | 'feelings' | 'past' | 'future' | 'family' | 'personality' | 'practical';

interface Question {
  text: string;
  category: Category;
}

const questions: Question[] = [
  { text: 'Сколько честности тебе нужно в отношениях?', category: 'trust' },
  { text: 'Продолжи фразу: «Я думаю, что в отношениях можно прочить все, кроме...»', category: 'trust' },
  { text: 'Ты чувствуешь себя со мной безопасно на 100%? Назови три способа чувствовать себя безопаснее рядом со мной.', category: 'trust' },
  { text: 'Ты чувствуешь, что я тебя принимаю полностью? Если нет, то где я тебя не принимаю и как это можно исправить?', category: 'trust' },
  { text: 'Когда ты в последний раз врал кому-то?', category: 'trust' },
  { text: 'Какое мое качество или проявление кажется тебе непонятным?', category: 'trust' },
  { text: 'В какие моменты я бываю токсичным человеком?', category: 'trust' },
  { text: 'Было ли тебе неприятно, когда я общался (общалась) с человеком, к которому я, по твоему мнению, испытывал симпатию (или он ко мне)?', category: 'trust' },
  { text: 'Тебя может задеть, если я буду иногда переписываться со своими экс-возлюбленными в социальных сетях?', category: 'trust' },
  { text: 'Тебя задевает, если я долго не отвечаю тебе в мессенджерах?', category: 'trust' },
  { text: 'Когда ты в последний раз поддался (поддалась) моему давлению и пожалел потом об этом?', category: 'trust' },
  { text: 'Что ты считаешь эмоциональным/физическим предательством?', category: 'trust' },
  { text: 'Как бы ты себя повел, если бы почувствовал влечение к другому человеку?', category: 'trust' },
  
  { text: 'Какой самый быстрый способ стать тебе ближе?', category: 'intimacy' },
  { text: 'Как наши отношения помогают тебе расти?', category: 'intimacy' },
  { text: 'Как изменился твой мир с моим появлением?', category: 'intimacy' },
  { text: 'Ты чувствуешь, что я рядом, когда тебе это бывает нужно?', category: 'intimacy' },
  { text: 'Как мне вести себя с тобой, если ты злишься?', category: 'intimacy' },
  { text: 'Как тебя остудить во время спора?', category: 'intimacy' },
  { text: 'Что из наших отношений можно перенести в твою карьеру?', category: 'intimacy' },
  { text: 'За что ты мне больше всего благодарен?', category: 'intimacy' },
  { text: 'Назови три причины, по которым ты выбираешь меня как партнера.', category: 'intimacy' },
  { text: 'Какие совместные приключения мы можем пережить, чтобы сделать наши отношения ярче?', category: 'intimacy' },
  { text: 'Как ты видишь наши отношения через год? (В духовно-эмоциональной, финансовой и сексуальной сфере?)', category: 'intimacy' },
  { text: 'Что тебе нравится в отношениях твоих родителей, а что — нет?', category: 'intimacy' },
  { text: 'На какую из крепких пар нам стоило бы быть похожими?', category: 'intimacy' },
  { text: 'Какие качества есть у нас обоих?', category: 'intimacy' },
  { text: 'Какие ценности нас объединяют?', category: 'intimacy' },
  { text: 'Продолжи фразу: «Мы оба с тобой очень любим...»', category: 'intimacy' },
  { text: 'Когда мы с тобой говорим, кто из нас больше слушает, а кто — говорит? Нужно ли поменять пропорцию?', category: 'intimacy' },

  { text: 'Как часто тебе нужен секс?', category: 'adult' },
  { text: 'В каком необычном месте ты хотел бы заняться сексом?', category: 'adult' },
  { text: 'Чувствуешь ли ты во время секса, что я полностью принимаю твое тело?', category: 'adult' },
  { text: 'Ты любишь оральный секс?', category: 'adult' },
  { text: 'Тебе бывает некомфортно говорить со мной о сексе? Почему?', category: 'adult' },
  { text: 'Какие у тебя есть эрогенные зоны, о которых я могу не знать?', category: 'adult' },
  { text: 'Тебе бы хотелось, чтобы я проявлял(а) больше инициативы в сексе?', category: 'adult' },
  { text: 'Что ты предпочитаешь делать сразу после секса?', category: 'adult' },
  { text: 'Что может полностью заглушить твое сексуальное возбуждение?', category: 'adult' },
  { text: 'Какие секс-игрушки тебе хочется попробовать?', category: 'adult' },
  { text: 'Если бы мы выбрали для секса ролевые игры, то какой был бы сценарий?', category: 'adult' },
  { text: 'Какие у тебя есть тайные сексуальные фантазии?', category: 'adult' },
  { text: 'Если ли что-то, чего я не знаю о том, как тебя удовлетворить в сексе?', category: 'adult' },
  { text: 'Ты каждый раз испытываешь оргазм, когда мы занимаемся сексом?', category: 'adult' },
  { text: 'Продолжи фразу: «В сексе я никогда не соглашусь...»', category: 'adult' },
  { text: 'Чего я не делаю, чтобы разнообразить нашу сексуальную жизнь?', category: 'adult' },
  { text: 'Испытываешь ли ты духовную близость со мной во время секса?', category: 'adult' },
  { text: 'Стоит ли мне усовершенствовать навыки орального секса?', category: 'adult' },
  { text: 'Какую часть своего тела ты считаешь самой сексуальной?', category: 'adult' },
  { text: 'Какую часть моего тела ты считаешь особенно сексуальной?', category: 'adult' },
  { text: 'Есть ли на твоем теле зоны, которые чрезмерно чувствительны к стимуляции?', category: 'adult' },
  { text: 'Как ты относишься к сексу втроем?', category: 'adult' },
  { text: 'Чего ты ждешь от наших сексуальных отношений?', category: 'adult' },
  { text: 'Испытываешь ли смущение из-за своего тела во время секса?', category: 'adult' },
  { text: 'Как показать тебе, что я хочу немедленно заняться с тобой сексом?', category: 'adult' },
  { text: 'Какую новую позу в сексе ты хочешь попробовать?', category: 'adult' },
  { text: 'Хватает ли тебе прелюдии во время секса?', category: 'adult' },
  { text: 'Как сделать твое настроение игривым и сексуальным?', category: 'adult' },
  { text: 'Делаю ли я что-то, что заставляет тебя смущаться по поводу своего тела?', category: 'adult' },
  { text: 'Какие новые виды секса ты хотел(а) бы попробовать?', category: 'adult' },
  { text: 'Если я сильно наберу вес, это повлияет на наши сексуальные отношения?', category: 'adult' },
  { text: 'Какие три фразы ты хотел(а) бы услышать во время секса?', category: 'adult' },
  { text: 'Сколько раз в день ты думаешь о сексе?', category: 'adult' },

  { text: 'Что тебя опустошает сильнее всего?', category: 'feelings' },
  { text: 'Какой у тебя есть главный страх, связанный с нашими отношениями?', category: 'feelings' },
  { text: 'Чувствуешь ли ты, что ценю тебя как личность и как профессионала?', category: 'feelings' },
  { text: 'Чувствуешь ли ты, что обязан(а) оправдывать мои ожидания?', category: 'feelings' },
  { text: 'В этом году ты чувствовал(а), что тебе нужно больше, чем я могу дать?', category: 'feelings' },
  { text: 'Какие слова поддержки и комплименты ты хочешь слышать чаще?', category: 'feelings' },
  { text: 'Бывает ли у тебя ощущение, что тебя не за что любить? Когда такое было в последний раз?', category: 'feelings' },
  { text: 'Какие твои языки любви? Как я могу проявить любовь к тебе?', category: 'feelings' },
  { text: 'Что вызывает у тебя сильное беспокойство?', category: 'feelings' },
  { text: 'Какая твоя главная негативная установка?', category: 'feelings' },
  { text: 'Какой твой самый большой комплекс?', category: 'feelings' },
  { text: 'Что ты можешь назвать эмоциональным насилием?', category: 'feelings' },
  { text: 'Если я сержусь на тебя, как мне это лучше выразить?', category: 'feelings' },
  { text: 'Ты бываешь врагом самому себе? Почему и в каких сферах?', category: 'feelings' },

  { text: 'Каким секретом ты никогда ни с кем не делился?', category: 'past' },
  { text: 'Если бы была возможность вернуться в прошлое и исправить одно решение, что это было бы?', category: 'past' },
  { text: 'Какое событие из своей жизни ты хотел(а) бы забыть навсегда?', category: 'past' },
  { text: 'Тебе доводилось сталкиваться с сексуальными домогательствами? Если да, то как это отразилось на твоей сексуальности?', category: 'past' },
  { text: 'Какую важную истину ты познал в этом году?', category: 'past' },
  { text: 'Во что ты верил в прошлом году, но перестал верить в этом?', category: 'past' },
  { text: 'Если бы ты мог(ла) изменить что-то из нашего общего прошлого, то что?', category: 'past' },
  { text: 'Какая твоя главная победа за сегодняшний день?', category: 'past' },
  { text: 'Какой из дней за последнее время был самым продуктивным?', category: 'past' },
  { text: 'Что помогло тебе чувствовать себя успешным в этом году?', category: 'past' },
  { text: 'Твоя самая бесполезная покупка за год?', category: 'past' },
  { text: 'Какое у тебя самое яркое совместное переживание?', category: 'past' },
  { text: 'Какое событие этого года для тебя главное?', category: 'past' },
  { text: 'Какую мою фразу, произнесенную в этом году, ты запомнил и почему?', category: 'past' },
  { text: 'Когда с тобой последний раз флиртовали? А ты?', category: 'past' },

  { text: 'У тебя есть личная миссия?', category: 'future' },
  { text: 'В чем ты видишь смысл своей жизни?', category: 'future' },
  { text: 'Как выглядит твоя идеальная карьера?', category: 'future' },
  { text: 'Сколько тебе хотелось бы зарабатывать через год?', category: 'future' },
  { text: 'Если бы ты знал, что скоро умрешь, что бы ты изменил(а) в своей жизни?', category: 'future' },
  { text: 'Ты хочешь создать в этой жизни нечто великое?', category: 'future' },
  { text: 'Ты хотел(а) бы жить в другой стране?', category: 'future' },
  { text: 'Какими делами ты готов заниматься 24/7?', category: 'future' },
  { text: 'Чем бы ты хотел заняться в карьере, но переживаешь, что у тебя это не получится?', category: 'future' },
  { text: 'Какую главную ценность ты хотел(а) бы передать детям?', category: 'future' },

  { text: 'Что главное в воспитании детей?', category: 'family' },
  { text: 'Что ты выбрал(а) бы для своих детей: домашнее обучение или государственное образование?', category: 'family' },
  { text: 'Как ты относишься к усыновлению детей?', category: 'family' },
  { text: 'Как и за что следует наказывать детей?', category: 'family' },
  { text: 'Как и за что следует вознаграждать детей?', category: 'family' },
  { text: 'Что для тебя самое сложное в воспитании детей?', category: 'family' },
  { text: 'Назови три главных навыка любого родителя.', category: 'family' },
  { text: 'Как ты думаешь, чего категорически нельзя говорить детям?', category: 'family' },
  { text: 'Как ты любишь проводить время с детьми?', category: 'family' },
  { text: 'Что ты скажешь своему ребенку, если он выберет карьеру, которая для тебя неприемлемая этическая?', category: 'family' },
  { text: 'Как, на твой взгляд, должны распределяться роли в семье и почему?', category: 'family' },
  { text: 'Влияет ли количество денег на воспитание детей?', category: 'family' },
  { text: 'Есть ли какие-то вещи, которые ты делал в своей жизни, но не хочешь, чтобы это делали твои дети?', category: 'family' },
  { text: 'Какие вещи из тех, что делают мои родители, выводят тебя из себя?', category: 'family' },

  { text: 'От какой вредной привычки тебе сложнее всего отказаться?', category: 'personality' },
  { text: 'Ты хотел бы что-то изменить в своей внешности?', category: 'personality' },
  { text: 'Что ты больше всего ценишь в людях?', category: 'personality' },
  { text: 'Как ты относишься к моей вредной привычке, такой как...', category: 'personality' },
  { text: 'С какой мыслью ты сегодня проснулся (проснулась)?', category: 'personality' },
  { text: 'Какой твой самый «бесполезный» талант на данный момент?', category: 'personality' },
  { text: 'Если говорить о времени, в котором мы живем, то каким бы прилагательным ты его обозначил?', category: 'personality' },
  { text: 'Какой главный духовный урок ты получил за последний год?', category: 'personality' },
  { text: 'О чем ты думаешь чаще всего последний год?', category: 'personality' },
  { text: 'Случалось ли у тебя сказочное везение?', category: 'personality' },
  { text: 'Считаешь ли ты кого-то своими врагами? Кого?', category: 'personality' },
  { text: 'Какая сфера для тебя сейчас в приоритете?', category: 'personality' },
  { text: 'Какая песня напоминает тебе обо мне?', category: 'personality' },

  { text: 'Кому ты помог(ла) в этом году?', category: 'practical' },
  { text: 'Назови двух моих лучших друзей и почему, как тебе кажется, мы дружим.', category: 'practical' },
  { text: 'Есть ли обещания, которые я не выполнил(а), и это тебя расстраивает?', category: 'practical' },
  { text: 'Какие три моих качества тебя восхищают?', category: 'practical' },
  { text: 'Какой мой подарок тебе больше всего запомнился?', category: 'practical' },
  { text: 'Куда ты хотел(а) бы сходить со мной на свидание?', category: 'practical' },
  { text: 'Насчет чего я сейчас переживаю больше всего?', category: 'practical' },
  { text: 'Что ты называешь конфликтом и считаешь ли, что конфликты полезны для отношений?', category: 'practical' },
  { text: 'О чем ты больше всего любишь со мной разговаривать?', category: 'practical' },
  { text: 'Что ты сделал(а) бы, если бы меня посадили в тюрьму?', category: 'practical' },
  { text: 'Есть ли у тебя какие-то проблемы? Как я могу тебе помочь в их решении?', category: 'practical' },
  { text: 'Что было самым сложным для тебя на этой неделе?', category: 'practical' },
  { text: 'Есть ли что-то, что ты хочешь купить, но у тебя недостаточно денег?', category: 'practical' },
  { text: 'Какой для тебя идеальный отдых?', category: 'practical' },
  { text: 'Как часто ты хочешь слышать, что я тебя люблю?', category: 'practical' },
  { text: 'Какой для тебя лучший фильм года?', category: 'practical' },
  { text: 'Какие слова лучше никогда не произносить при тебе?', category: 'practical' },
  { text: 'Ты бы порвал(а) отношения со мной, чтобы не быть обузой в случае потери трудоспособности?', category: 'practical' },
  { text: 'Как ты думаешь, в чем главная причина разводов?', category: 'practical' },
  { text: 'Продолжи фразу: «От меня можно ожидать чего угодно, когда я...»', category: 'practical' },
];

const categoryNames: Record<Category, string> = {
  random: 'Рандом',
  trust: 'О доверии и честности',
  intimacy: 'О близости и поддержке',
  adult: '18+',
  feelings: 'Чувства и личное',
  past: 'Прошлое, опыт и саморефлексия',
  future: 'Будущее и амбиции',
  family: 'Семейное дело',
  personality: 'Личность и взгляды на жизнь',
  practical: 'Разное и практическое',
};

const Index = () => {
  const [gameMode, setGameMode] = useState<GameMode>('menu');
  const [selectedCategory, setSelectedCategory] = useState<Category>('random');
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);

  const getRandomQuestion = (category: Category): Question => {
    let availableQuestions = questions;
    
    if (category !== 'random') {
      availableQuestions = questions.filter(q => q.category === category);
    }
    
    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    return availableQuestions[randomIndex];
  };

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
    setGameMode('playing');
    setCurrentQuestion(getRandomQuestion(category));
  };

  const handleNewCard = () => {
    setIsFlipping(true);
    
    setTimeout(() => {
      setCurrentQuestion(getRandomQuestion(selectedCategory));
      setIsFlipping(false);
    }, 400);
  };

  const handleBackToMenu = () => {
    setGameMode('menu');
    setCurrentQuestion(null);
    setSelectedCategory('random');
  };

  useEffect(() => {
    let shakeTimeout: NodeJS.Timeout;
    let lastShakeTime = 0;
    const shakeThreshold = 15;
    const shakeDelay = 1000;

    const handleShake = (event: DeviceMotionEvent) => {
      const acceleration = event.accelerationIncludingGravity;
      if (!acceleration) return;

      const { x, y, z } = acceleration;
      const totalAcceleration = Math.sqrt((x || 0) ** 2 + (y || 0) ** 2 + (z || 0) ** 2);

      const currentTime = Date.now();
      if (totalAcceleration > shakeThreshold && currentTime - lastShakeTime > shakeDelay) {
        lastShakeTime = currentTime;
        if (gameMode === 'playing') {
          handleNewCard();
        }
      }
    };

    if (gameMode === 'playing') {
      window.addEventListener('devicemotion', handleShake);
    }

    return () => {
      window.removeEventListener('devicemotion', handleShake);
      clearTimeout(shakeTimeout);
    };
  }, [gameMode, selectedCategory]);

  if (gameMode === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FFF8F0] via-[#F5E6D3] to-[#E5D4C1] flex flex-col items-center justify-center p-6">
        <div className="max-w-2xl w-full animate-fade-in">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-primary mb-4">
              Наша игра
            </h1>
            <p className="text-lg text-primary/80 font-light max-w-md mx-auto">
              Вытягивайте карточки и отвечайте на вопросы, чтобы стать ближе друг к другу
            </p>
          </div>

          <div className="grid gap-3 md:gap-4">
            {(Object.keys(categoryNames) as Category[]).map((category) => (
              <Button
                key={category}
                onClick={() => handleCategorySelect(category)}
                variant="outline"
                className="h-auto py-4 px-6 text-left justify-start bg-white/80 hover:bg-white border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <span className="text-lg font-medium text-primary">
                  {categoryNames[category]}
                </span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F0] via-[#F5E6D3] to-[#E5D4C1] flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        <div className="mb-6 flex items-center justify-between">
          <Button
            onClick={handleBackToMenu}
            variant="ghost"
            className="text-primary hover:text-primary/80"
          >
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            Назад
          </Button>
          
          <span className="text-sm font-medium text-primary/70">
            {categoryNames[selectedCategory]}
          </span>
        </div>

        <div 
          className={`bg-white rounded-3xl shadow-2xl p-8 md:p-12 min-h-[400px] flex flex-col items-center justify-center transition-all duration-500 ${
            isFlipping ? 'animate-flip-out' : 'animate-flip-in'
          }`}
          style={{ perspective: '1000px' }}
        >
          {currentQuestion && (
            <div className="text-center space-y-8">
              <p className="text-2xl md:text-3xl font-serif text-primary leading-relaxed">
                {currentQuestion.text}
              </p>
              
              <div className="pt-4">
                <p className="text-sm text-primary/50 mb-6">
                  Потрясите телефон или нажмите кнопку для новой карточки
                </p>
                <Button
                  onClick={handleNewCard}
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-8 py-6 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Icon name="Shuffle" size={20} className="mr-2" />
                  Следующая карточка
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
