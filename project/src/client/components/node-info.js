import { h, Component } from 'preact';

class NodeInfo extends Component {
  constructor(props){
    super(props);
    this.state = {
      toggle: false,
    };
  }

  toggleClick() {
    this.setState({
      toggle: !this.state.toggle
    });
  }

  render(){
    const { node, relatedNodes: related } = this.props;
    const data = node.data();
    const { Title: name, URL, Genres, "imdbRating": rating } = data;
    const type = data.NodeTypeFormatted + (data.Type ? ` (${data.Type})` : '');
    let relatedData;
    if (Array.isArray(related)) {
      const titles = related.map(relatedNode => {
        return h('div', { class: 'node-related-title' }, [
          h('span', {}, relatedNode.title),
          h('span', { class: 'node-realted-title-reason'}, relatedNode.reason)
        ]);
      });

      relatedData = h('div', {}, [
        h('div', {
            class: 'node-info-click-toggle',
            onClick: () => this.toggleClick()
          }, 
          'Related titles',
          h('span', { class: 'node-info-expand'}, '▼')
        ),
        ...(this.state.toggle ? titles : [])
      ]);
    }

    const typeElem = h('span', { class: 'node-info-type' }, type);

    return h('div', { class: 'node-info' }, [
      h('div', { class: 'node-info-name' }, name, typeElem),
      h('div', { class: 'node-info-genres' }, Genres),
      h('div', { class: 'node-info-genres' }, `IMDb Rating: ${rating}`),
      h('div', { class: 'node-info-more' }, [
        h('a', { target: '_blank', href: URL }, 'More information')
      ]),
      h('div', { class: 'node-info-related' }, relatedData),
    ]);
  }
}

export default NodeInfo;
export { NodeInfo };