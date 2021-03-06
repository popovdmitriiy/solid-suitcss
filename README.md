# Solid-suitcss

A Solid-js component utility to generate CSS class names that confirm to [SUIT CSS naming conventions](https://github.com/suitcss/suit/blob/master/doc/naming-conventions.md).

This utility can be used as a utility function inside solid-js components. Generally it provides high order function `createClassName`, it returns function `getClassName`, which is used to generate component classNames.

It also provides high order component `withSuitCss`, which can automatically determine component name.

* __componentName__ - the component's name, must be in pascal case.
* __namespace__ - optional, can be used to declare component's namespace


```JavaScript
const getClassName = createClassName(
  componentName: string,
  namespace?: string,
)
```

```JavaScript
getClassName({
  descendantName?: string,
  modifiers?: string | Array<string>,
  states?: string | Array<string>,
  utilities?: string | Array<string>,
  className?: string,
  namespace?: string,
  componentName?: string,
})
```

## Installation

```
npm install solid-suitcss
# or
yarn add solid-suitcss
```

## Usage

### Basic functionality

```JavaScript
import { render } from "solid-js/web";
import { createClassName } from "solid-suitcss";

const App = () => {
  const getClassName = createClassName("App");

  return (
    <section class={getClassName()}>
      <header class={getClassName({ descendantName: "header" })}>
        Header
      </header>
      <div
        class={getClassName({
          descendantName: "content",
          utilities: ["fullSize", "mb-10"],
        })}
      >
        Content
      </div>
      <button
        class={getClassName({
          descendantName: "button",
          modifiers: "primary outline",
        })}
      >
        Click me
      </button>
    </section>
  );
};

render(() => <App />, document.getElementById("app"));
```

### Using context provider

With the help of context provider you can define namespace for all child components.

```JavaScript
import { render } from "solid-js/web";
import { createClassName, SuitCssProvider } from "solid-suitcss";

const App = () => {
  const getClassName = createClassName("App");

  return (
    <section class={getClassName()}>
      <header class={getClassName({ descendantName: "header" })}>
        Header
      </header>
    </section>
  );
};

render(
  () => (
    <SuitCssProvider namespace="mine">
      <App />
    </SuitCssProvider>
  ),
  document.getElementById("app")
);
```

### High order component functionality

HOC will pass `getClassName` prop inside your component

Automatically determine component name using `Component.name` attribute.

You can pass `namespace` as the second argument of the HOC

```JavaScript
import { render } from "solid-js/web";
import { withSuitCss, SuitCssProps } from "solid-suitcss";

interface AppProps extends SuitCssProps {}

const App: Component<AppProps> = (p) => {
  return (
    <section class={p.getClassName()}>
      <header class={p.getClassName({ descendantName: "header" })}>
        Header
      </header>
    </section>
  );
};

const AppWithSuitCss = withSuitCss(App)

render(
  () => (
    <AppWithSuitCss />
  ),
  document.getElementById("app")
);
```

## Examples

#### We have this

```JavaScript
const getClassName = createClassName("MyComponent");
```

#### What we expect

```JavaScript
getClassName() ===> 'MyComponent'

getClassName({ namespace: 'mine' }) ===> 'mine-MyComponent'

getClassName({ componentName: 'Test' }) ===> 'Test'

getClassName({ descendantName: 'header' }) ===> 'MyComponent MyComponent-header'

getClassName({ modifiers: ['primary', 'outline'] }) ===> 'MyComponent MyComponent--primary MyComponent--outline'

getClassName({ utilities: 'mb-10 fill' }) ===> 'MyComponent u-mb-10 u-fill'

getClassName({ states: 'active' }) ===> 'MyComponent is-active'

getClassName({ className: 'something' }) ===> 'MyComponent something'
```

## Build

```
npm run build
```

## Release History

* 1.0.0 - Changed HOC name to `withSuitCss`. Improved typing. Fixed README and code optimization
* 0.3.1 - Added jest config and tests for createClassName function
* 0.3.0 - Added new high order component
* 0.2.0 - Fixed functionality, dependencies cleanup
* 0.1.1 - Added description
* 0.1.0 - Initial release
