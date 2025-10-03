// React Native polyfill for styled-components and other web APIs
if (typeof document === 'undefined') {
  global.document = {
    head: {
      // Fake DOM
      appendChild: () => {},
      insertBefore: () => {},
      removeChild: () => {},
    },
    createElement: () => ({
      // Fake element creation
      setAttribute: () => {},
      style: {},
      appendChild: () => {},
      removeChild: () => {},
    }),
    createTextNode: () => ({}),
    querySelector: () => null, // Fake DOM queries
    querySelectorAll: () => [],
  };
}

if (typeof window === 'undefined') {
  global.window = global;
}

if (typeof location === 'undefined') {
  global.location = {
    href: 'https://localhost', //Fake URL properties
    origin: 'https://localhost',
    protocol: 'https:',
    host: 'localhost',
    hostname: 'localhost',
    port: '',
    pathname: '/',
    search: '',
    hash: '',
  };
}

// Add location to window object as well
if (global.window && !global.window.location) {
  global.window.location = global.location;
}

// Add navigator if missing
if (typeof navigator === 'undefined') {
  global.navigator = {
    userAgent: 'React Native',
    platform: 'React Native',
  };
}
