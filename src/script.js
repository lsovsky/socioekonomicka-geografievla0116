document.addEventListener("DOMContentLoaded", () => {
    const questions = [
        {
            text: "Jaký je největší oceán na Zemi?",
            answers: ["Atlantský oceán", "Indický oceán", "Tichý oceán", "Severní ledový oceán"],
            correct: 2
        },
        {
            text: "Kolik kontinentů obecně rozlišujeme?",
            answers: ["5", "6", "7", "4"],
            correct: 2
        },
        {
            text: "Která řeka je nejdelší na světě?",
            answers: ["Nil", "Amazonka", "Jang-c’-ťiang", "Mississippi"],
            correct: 1
        },
        {
            text: "Jaká je nejvyšší hora světa?",
            answers: ["K2", "Makalu", "Mount Everest", "Lhotse"],
            correct: 2
        },
        {
            text: "Který stát má největší rozlohu?",
            answers: ["Kanada", "Rusko", "Čína", "Brazílie"],
            correct: 1
        },
        {
            text: "Které z těchto moří je nejslanější?",
            answers: [
                "Rudé moře",
                "Baltské moře",
                "Jaderské moře",
                "Žádné z uvedených (Mrtvé moře je nejslanější, ale není to moře)"
            ],
            correct: 3
        },
        {
            text: "Které podnebí má nejvyšší teploty během celého roku?",
            answers: ["Polární", "Mírné", "Tropické", "Subarktické"],
            correct: 2
        },
        {
            text: "Co označuje pojem „rovník“?",
            answers: [
                "Poledník 0°",
                "Nejdelší rovnoběžku na Zemi",
                "Bod na severním pólu",
                "Nadmořskou výšku"
            ],
            correct: 1
        },
        {
            text: "Který oceán omývá východní pobřeží Afriky?",
            answers: ["Tichý oceán", "Atlantský oceán", "Indický oceán", "Severní ledový oceán"],
            correct: 2
        },
        {
            text: "Který kontinent má nejvíce států?",
            answers: ["Evropa", "Afrika", "Asie", "Jižní Amerika"],
            correct: 1
        },
        {
            text: "Co je to delta řeky?",
            answers: [
                "Místo, kde řeka vzniká",
                "Místo, kde řeka mění směr",
                "Místo, kde řeka prudce klesá",
                "Místo, kde se řeka větví a vlévá do moře nebo jezera"
            ],
            correct: 3
        },
        {
            text: "Který stát má největší populaci?",
            answers: ["Spojené státy", "Indie", "Čína", "Indonésie"],
            correct: 1
        }
    ];

    let current = 0;
    let correctCount = 0;

    const startQuizBtn = document.getElementById("start-btn");
    const quiz = document.getElementById("quiz");
    const questionEl = document.getElementById("question");
    const answersEl = document.getElementById("answers");
    const resultEl = document.getElementById("result");
    const progressEl = document.getElementById("quiz-progress");

    if (startQuizBtn) {
        startQuizBtn.addEventListener("click", () => {
            startQuizBtn.style.display = "none";
            quiz.style.display = "block";
            showQuestion();
        });
    }

    function showQuestion() {
        let q = questions[current];

        if (progressEl) {
            progressEl.textContent = `Otázka ${current + 1} / ${questions.length}`;
        }

        questionEl.textContent = q.text;

        questionEl.classList.remove("fade-in");
        void questionEl.offsetWidth;
        questionEl.classList.add("fade-in");

        answersEl.innerHTML = "";

        q.answers.forEach((ans, i) => {
            let btn = document.createElement("button");
            btn.textContent = ans;
            btn.onclick = () => checkAnswer(i);
            answersEl.appendChild(btn);
        });
    }

    function checkAnswer(i) {
        if (i === questions[current].correct) correctCount++;

        current++;
        if (current < questions.length) {
            showQuestion();
        } else {
            endQuiz();
        }
    }

    function endQuiz() {
        quiz.style.display = "none";
        resultEl.style.display = "block";

        let total = questions.length;
        let wrong = total - correctCount;

        let grade = "";
        if (correctCount === total) grade = "🔥 Perfektní výsledek!";
        else if (correctCount >= total * 0.7) grade = "👍 Výborně!";
        else if (correctCount >= total * 0.5) grade = "🙂 Dobrá práce!";
        else grade = "😐 Můžeš to zlepšit!";

        resultEl.innerHTML = `
            <h2>Výsledek</h2>
            <p>Správně: <b>${correctCount}</b></p>
            <p>Špatně: <b>${wrong}</b></p>
            <h3>${grade}</h3>
        `;
    }


    const clickSound = document.getElementById("click-sound");

    const buttons = document.querySelectorAll("button:not(.link-btn):not(.voice-btn)");
    buttons.forEach(el => {
        el.addEventListener("click", () => {
            if (!clickSound) return;
            clickSound.currentTime = 0;
            clickSound.play().catch(() => {});
        });
    });

    const links = document.querySelectorAll("a");
    links.forEach(link => {
        link.addEventListener("click", (event) => {
            if (link.classList.contains("voice-btn")) return;
            if (!clickSound) return;

            event.preventDefault();
            clickSound.currentTime = 0;
            clickSound.play().catch(() => {});

            setTimeout(() => {
                window.location.href = link.href;
            }, 300);
        });
    });

    const startBtn = document.getElementById("voiceStart");
    if (startBtn) {
        startBtn.addEventListener("click", () => {
            window.speechSynthesis.cancel();
            const text = document.body.innerText;

            const speech = new SpeechSynthesisUtterance(text);
            speech.lang = "cs-CZ";
            speech.rate = 1;
            speech.pitch = 1;

            window.speechSynthesis.speak(speech);
        });
    }

    const stopBtn = document.getElementById("voiceStop");
    if (stopBtn) {
        stopBtn.addEventListener("click", () => {
            window.speechSynthesis.cancel();
        });
    }

});
