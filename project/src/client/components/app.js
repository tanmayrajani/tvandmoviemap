import { h, Component } from 'preact';
import { Controller } from '../controller';
import Cytoscape from 'cytoscape';
import { titles, style } from '../cy-conf';
import CytoscapeComponent from './cytoscape';
import { isDev } from '../env';
import { NodeInfo } from './node-info';
import { Menu } from './menu';

class AppComponent extends Component {
  constructor(props){
    super(props);

    const cy = new Cytoscape({
      elements: titles,
      style,
      layout: { name: 'preset' },
      selectionType: 'single',
      boxSelectionEnabled: false,
      maxZoom: 8,
      minZoom: 0.1
    });

    cy.nodes().panify().ungrabify();
    console.log(
      "%cWhat are %cYOU %cdoing here?", 
      "color: blue; font-size:20px;", 
      "color: blue; font-size:30px; font-style: italic;", 
      "color: blue; font-size:20px;"
    );
    console.log("https://i.imgur.com/aiRbxLY.png");

    const controller = new Controller({ cy });
    const bus = controller.bus;

    if( isDev ){
      window.cy = cy;
      window.controller = controller;
    }

    this.state = { controller, cy };

    bus.on('showInfo', this.onShowInfo = (node => {
      this.setState({ infoNode: node });
    }));

    bus.on('hideInfo', this.onHideInfo = (() => {
      this.setState({ infoNode: null });
    }));
  }

  componentWillUnmount(){
    const bus = this.state.controller.bus;

    bus.removeListener('showInfo', this.onShowInfo);
    bus.removeListener('hideInfo', this.onHideInfo);
  }

  render(){
    const { cy, controller, infoNode } = this.state;
    const related = [];
    if (infoNode) {
      const nhood = this.lastHighlighted = infoNode.closedNeighborhood();
      for (var i = 0; i < nhood.length; i++) { 
        const node = nhood[i];
        const edges = node.edgesWith(infoNode);
        if (edges.length) {
          related.push({
            title: node.data().Title,
            reason: edges[0].data().reason
          });
        }
      }
    }
    return h('div', { class: 'app' }, [
      h(CytoscapeComponent, { cy, controller }),

      infoNode ? (
        h('div', { class: 'app-node-info' }, [
          h(NodeInfo, { node: infoNode, relatedNodes: related })
        ])
      ) : null,

      h(Menu, { controller })
    ]);
  }
}

export default AppComponent;
export { AppComponent };