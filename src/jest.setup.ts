interface ISideEffect {
  [key: string]: {
    addEventListener: {
      fn: Function;
      refs: Array<{ type: String; listener: Function; options: Object; }>;
    };
    keys: Array<Object>;
  };
}

const sideEffects: ISideEffect = {
  document: {
    addEventListener: {
      fn: document.addEventListener,
      refs: [],
    },
    keys: Object.keys(document),
  },
  window: {
    addEventListener: {
      fn: window.addEventListener,
      refs: [],
    },
    keys: Object.keys(window),
  },
};

beforeAll(async () => {
  [ "document", "window" ].forEach((obj) => {

    const fn = sideEffects[obj].addEventListener.fn;

    const refs = sideEffects[obj].addEventListener.refs;

    const addEventListenerSpy = (type: String, listener: Function, options: Object) => {
      refs.push({ type, listener, options });
      fn(type, listener, options);
    };


    sideEffects[obj].keys.push("addEventListener");


    (<any>global)[obj].addEventListener = addEventListenerSpy;
  });
});

beforeEach(() => {

  const root = document.documentElement;
  [ "document", "window" ].forEach((obj) => {

    const refs = sideEffects[obj].addEventListener.refs;
    while (refs.length) {
      const lastRef = refs.pop();
      if (lastRef) {

        (<any>global)[obj].removeEventListener(lastRef.type, lastRef.listener, lastRef.options);
      }
    }
  });
  root.innerHTML = "<head><title></title></head><body></body>";
});
