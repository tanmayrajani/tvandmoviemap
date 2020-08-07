import { isProd } from './env';
import { h, render } from 'preact';
import { AppComponent } from './components/app';

if( !isProd ){ // set up livereload for dev
  const script = document.createElement('script');

  script.src = 'http://' + location.hostname + ':35729/livereload.js?snipver=1';

  document.head.appendChild( script );
}

const root = document.createElement('div');

root.setAttribute('id', 'root');
document.body.appendChild(root);

render(h(AppComponent), root);
