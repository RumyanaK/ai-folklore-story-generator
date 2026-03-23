export default function AboutPage() {
  return (
    <main
      style={{
        maxWidth: 800,
        margin: "60px auto",
        fontFamily: "Segoe UI, Arial",
        lineHeight: 1.7,
        padding: "0 20px",
        fontSize: 17,
      }}
>
            <p style={{ marginBottom: 30 }}>
        <a
          href="/"
          style={{
            textDecoration: "none",
            color: "#3f7f4c",
            fontWeight: 600,
          }}
        >
          ← Назад към началната страница
        </a>
      </p>
      
      <h1 style={{ marginBottom: 30, fontWeight: 700 }}>
        📖 За проекта
      </h1>

      <p>
        Този проект е прототип на генератор за персонализирани детски
        български народни приказки без жестокости и насилие. Детето става главният герой в историята, като родителят
        може да избере име, външен вид и приятел.
      </p>

      <p style={{ marginBottom: 24 }}>
        Основната идея на проекта е не само да създава персонализирани
        приказки, а и да демонстрира как изкуственият интелект може да се
        използва по <strong>етичен и отговорен начин</strong>.
      </p>

      <hr style={{ margin: "40px 0", opacity: 0.15 }} />

      <h2 style={{ marginTop: 40, marginBottom: 12, fontWeight: 700 }}>
        🎯 Цел на проекта
      </h2>

      <p style={{ marginBottom: 18 }}>
        В интернет съществуват много генератори на приказки, които използват
        AI, за да генерират автоматично текст и изображения. Често тези
        системи създават съдържание без редакция, без ясна авторска
        отговорност и без прозрачност как е използван AI.
      </p>

      <p style={{ marginBottom: 24 }}>
        Този проект изследва различен подход –
        <strong> AI като помощник, а не като автор</strong>.
      </p>

      <hr style={{ margin: "40px 0", opacity: 0.15 }} />

      <h2 style={{ marginTop: 40, marginBottom: 12, fontWeight: 700 }}>
        🤖 Как е използван AI
      </h2>

      <ul style={{ marginBottom: 24, paddingLeft: 22 }}>
        <li>+ за създаване на част от илюстрациите</li>
        <li>+ за подпомагане на разработката на софтуера</li>
        <li>+ като инструмент за експериментиране с дизайн и визуални сцени</li>
      </ul>

      <hr style={{ margin: "40px 0", opacity: 0.15 }} />

      <h2 style={{ marginTop: 40, marginBottom: 12, fontWeight: 700 }}>
        ✍️ Как AI НЕ е използван
      </h2>

      <ul style={{ marginBottom: 24, paddingLeft: 22 }}>
        <li>- текстът на приказката не е написан от AI</li>
        <li>- историята е измислена от човек</li>
        <li>- ценностите и поуката са създадени съзнателно от автора</li>
        <li>- AI не взима решения за съдържанието</li>
        <li>- AI няма достъп до лични данни на детето</li>
      </ul>

      <hr style={{ margin: "40px 0", opacity: 0.15 }} />

      <h2 style={{ marginTop: 40, marginBottom: 12, fontWeight: 700 }}>
        🌱 Защо това е важно
      </h2>

      <p style={{ marginBottom: 24 }}>
        Когато става дума за съдържание за деца, прозрачността и
        отговорността са особено важни. Този прототип показва как AI може
        да бъде използван като инструмент за творчество, без да замества
        човешкия замисъл, ценности и авторство.
      </p>

      <hr style={{ margin: "40px 0", opacity: 0.15 }} />

      <h2 style={{ marginTop: 40, marginBottom: 12, fontWeight: 700 }}>
        👩‍💻 Автор
      </h2>

      <p style={{ marginBottom: 24 }}>
        Проектът е създаден от{" "}
        <a
          href="https://www.linkedin.com/in/rumyana-kaludeva-8117a620/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "#3f7f4c",
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          Rumyana Kaludeva
        </a>{" "}
        като експеримент в областта на етичното използване на AI и
        персонализирано дигитално съдържание.
      </p>

      <hr style={{ margin: "40px 0", opacity: 0.15 }} />

      <h2 style={{ marginTop: 40, marginBottom: 12, fontWeight: 700 }}>
        💬 Обратна връзка
      </h2>

      <p style={{ marginBottom: 18 }}>
        Този проект е експериментален прототип и ще се радвам на всякаква
        обратна връзка – както от родители, така и от хора, които се
        интересуват от етичното използване на AI.
      </p>

      <p style={{ marginBottom: 18 }}>
        Ако имате идеи, въпроси или предложения за подобрение, можете да
        ми пишете директно в LinkedIn:
      </p>

      <p style={{ marginBottom: 24 }}>
        <a
          href="https://www.linkedin.com/in/rumyana-kaludeva-8117a620/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "#3f7f4c",
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          Свържете се с мен в LinkedIn
        </a>
      </p>

      <p style={{ marginBottom: 12 }}>
        Особено ще ми бъде полезно да споделите:
      </p>

      <ul style={{ marginBottom: 30, paddingLeft: 22 }}>
        <li>~ Какво ви харесва най-много в идеята?</li>
        <li>~ Какво бихте подобрили в преживяването?</li>
        <li>~ Бихте ли използвали подобна книжка за дете?</li>
      </ul>

      <p style={{ marginTop: 30, fontWeight: 700 }}>
        Благодаря, че отделихте време да разгледате проекта.
      </p>
    </main>
  );
}