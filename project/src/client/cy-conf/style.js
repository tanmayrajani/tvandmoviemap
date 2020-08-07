export default `
core {
	active-bg-color: #fff;
	active-bg-opacity: 0.333;
}

edge {
	curve-style: haystack;
	haystack-radius: 0;
	opacity: 0.3;
	width: 2;
	z-index: 0;
	overlay-opacity: 0;
	events: no;
}

node {
	width: 40;
	height: 40;
	font-size: 15;
	font-weight: bold;
	min-zoomed-font-size: 4;
	label: data(Title);
	text-wrap: wrap;
	text-max-width: 50;
	text-valign: center;
	text-halign: center;
	text-events: yes;
	color: #000;
	text-outline-width: 1;
	text-outline-color: #fff;
	text-outline-opacity: 1;
	overlay-color: #fff;
}

edge[interaction = "mm"] {
	line-color: #FACD37;
}

node[NodeType = "movie"] {
	background-color: #FACD37;
	text-outline-color: #FACD37;
}

node[NodeType != "tvEpisode"][imdbRating] {
	width: mapData(imdbRating, 5, 10, 40, 130);
	height: mapData(imdbRating, 5, 10, 40, 130);
}

node[NodeType = "tvEpisode"] {
	background-color: white;
	text-outline-color: white;
	font-size: 10;
}

edge[interaction = "mt"] {
	line-color: white;
}

node[NodeType = "tvSeries"] {
	background-color: #DE3128;
	text-outline-color: #DE3128;
}

edge[interaction = "tt"] {
	line-color: #DE3128;
}

node[NodeType = "tvMiniSeries"] {
	background-color: #A4EB34;
	text-outline-color: #A4EB34;
}

node.highlighted {
	min-zoomed-font-size: 0;
  	z-index: 9999;
}

edge.highlighted {
	opacity: 0.8;
	width: 4;
	z-index: 9999;
}

.faded {
  events: no;
}

node.faded {
  opacity: 0.08;
}

edge.faded {
  opacity: 0.06;
}

.hidden {
	display: none;
}

`;
