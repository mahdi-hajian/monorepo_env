class OgmaWrapper extends Ogma {

    constructor(params, style, resizeEvent = true) {
        super(params);
        this.realColors = {};
        this.realImages = {};
        this.needRender = true;
        Object.setPrototypeOf(this, new.target.prototype);
        const clearGraph = this.clearGraph;
        const addGraph = this.addGraph;
        const clearSelection = this.clearSelection;

        this.clearGraph = () => {
            this.markedEdges = {};
            this.markedNodes = {};
            clearGraph();
            this.render();
        };

        this.addGraph = async (graph) => {
            const result = addGraph(graph);
            this.render();
            return result;
        };

        this.clearSelection = () => {
            this.forceUnselect = true;
            clearSelection();
        };

        this.events.onDragStart((event) => {
            if (event.target == null || !event.target.isNode)
                this.tools.rectangleSelect.enable();
        });

        this.events.onDragEnd(() => {
            this.tools.rectangleSelect.disable();
            this.render();
        });

        this.events.onDragProgress(() => {
            this.render();
        });

        this.events.onZoomProgress(() => {
            this.render();
            this._zoom = this.getZoom();
        });

        this.events.onRendererStateChange(() => {
            this.render();
        });

        this.events.onEdgesSelected((event) => {
            this.render();
            event.edges.setAttribute('layer', 3);
            this.checkEdges = true;
        });

        this.events.onTooltipShown(() => {
            this.labelContextRelocation();
        });

        this.events.onTooltipHidden(() => {
            this.labelContextRelocation();
        });

        this.events.onNodesSelected((event) => {
            this.render();
            event.nodes.setAttribute('innerStroke', { color: '#dc3545', width: 5, minVisibleSize: 0 });
            event.nodes.setAttribute('layer', 3);
            if (this.checkEdges && event.nodes.size > 1) {
                const nodesDic = {};
                const selectedNodes = event.nodes;
                for (const node of selectedNodes.toArray())
                    if (!nodesDic[node.getId()])
                        nodesDic[node.getId()] = 1;

                const edgeIds = [];
                const edges = selectedNodes.getAdjacentEdges().toArray();
                for (const edge of edges) {
                    if (edge.getData().isEnable === false)
                        continue;
                    const sourceId = edge.getSource().getId();
                    const targetId = edge.getTarget().getId();
                    if (nodesDic[sourceId] && nodesDic[targetId])
                        edgeIds.push(edge.getId());
                }
                if (edgeIds.length > 0)
                    this.getEdges(edgeIds).setSelected(true);
            }
            this.checkEdges = true;
        });

        this.events.onNodesUnselected((event) => {
            this.render();
            event.nodes.filter(x => x.getData().frame !== false).setAttribute('innerStroke', { color: 'white', width: 2, minVisibleSize: 12 });
            event.nodes.filter(x => x.getData().frame === false).setAttribute('innerStroke', { color: null, width: 2, minVisibleSize: 12 });
            event.nodes.setAttribute('layer', 0);

            if (!this.forceUnselect && this.keyboard.isKeyPressed('ctrl')) {
                this.checkEdges = false;
                event.nodes.setSelected(true);
            }

            this.forceUnselect = false;
        });

        this.events.onEdgesUnselected((event) => {
            this.render();
            event.edges.setAttribute('layer', 0);
            if (!this.forceUnselect && this.keyboard.isKeyPressed('ctrl')) {
                this.checkEdges = false;
                event.edges.setSelected(true);
            }

            this.forceUnselect = false;
        });

        this.styles.setSelectedNodeAttributes(null);
        this.styles.setHoveredNodeAttributes({
            outerStroke: null,
            innerStroke: { color: 'red', width: 5, minVisibleSize: 0 }
        });

        this.events.onMouseMove((event) => {
            if (event.domEvent == null)
                return;

            switch (event.domEvent.buttons) {
                case 2:
                    this.changeCursor('grabbing');
                    this.view.move({ x: -event.dx, y: -event.dy });
                    break;
            }
        });

        this.events.onMouseButtonUp((event) => {
            if (event.button === 'right') {
                this.changeCursor('');
            }
        });

        this.events.onMouseButtonDown((event) => {
            if (event.target) {
                if (event.domEvent.ctrlKey && event.target.isSelected()) {
                    this.unselectedElement = event.target;
                }
            }
        });

        this.events.onClick((event) => {
            if (event.target && event.target === this.unselectedElement) {
                this.forceUnselect = true;
                this.unselectedElement.setSelected(false);
            }
            this.unselectedElement = null;
            this.forceUnselect = false;
        });

        this.events.onNodesAdded((event) => {
            for (const node of event.nodes.toArray()) {
                this.realColors[node.getId()] = node.getAttribute('color');
                const image = node.getAttribute(['image', 'url']);
                if (image)
                    this.realImages[node.getId()] = image;
            }
        });

        this.events.onEdgesAdded((event) => {
            for (const edge of event.edges.toArray())
                this.realColors[edge.getId()] = edge.getAttribute('color');
        });

        this.events.onNodesRemoved((event) => {
            for (const node of event.nodes.toArray())
                delete this.realColors[node.getId()];
        });

        this.styles.setHoveredNodeAttributes({
            outline: false
        });

        this.styles.setSelectedNodeAttributes({
            outline: false
        });

        this.styles.setSelectedEdgeAttributes({
            outline: false
        });

        this.styles.setHoveredEdgeAttributes({
            outline: false
        });

        this.graphContainer = params.container instanceof HTMLElement ? params.container : document.getElementById(params.container);

        this.labelStyle = style;
        this.createContext();

        if (resizeEvent)
            window.addEventListener('resize', () => this.resize());
    }

    setNodesSelected(nodes, isSelected, checkEdges) {
        this.checkEdges = checkEdges;
        nodes.setSelected(isSelected);
    }

    setEdgesSelected(edges, isSelected) {
        edges.setSelected(isSelected);
    }

    allowWiring() {
        this.wiringContext = createHiDPICanvas(this.graphContainer.clientWidth, this.graphContainer.clientHeight);
        this.wiringContext.style.position = 'absolute';
        this.wiringContext.style.top = '0';
        this.wiringContext.style.left = '0';
        this.wiringCtx = this.wiringContext.getContext('2d');

        this.events.onClick((event) => {
            if (event.target) {
                if (event.target.isNode) {
                    if (this.firstWiredNode) {
                        this.wiring = false;
                        this.wired.emit({ firstNode: this.firstWiredNode, secondNode: event.target });
                        this.firstWiredNode = null;
                    } else {
                        this.firstWiredNode = event.target;
                        this.wiring = true;
                    }
                }
            } else {
                this.wiring = false;
                this.firstWiredNode = null;
                this.drawLine(this.wiringCtx);
            }
        });

        this.events.onBeforeNodesRemoved((event) => {
            if (this.firstWiredNode && event.nodes.includes(this.firstWiredNode)) {
                this.clearWiring();
            }
        });

        this.events.onMouseMove(() => this.drawLine(this.wiringCtx));
    }

    clearWiring() {
        this.wiring = false;
        this.drawLine(this.wiringCtx);
        this.firstWiredNode = null;
    }

    changeFontSize(fontSize) {
        if (this.labelStyle)
            this.labelStyle.fontSize = fontSize;
    }

    render(labelCtx = this.labelCtx, markCtx = this.markCtx) {
        if (!this.graphContainer || !this.needRender)
            return;

        if (this.isFirstRender) {
            if (!this.fontLoaded) {
                WebFont.load({
                    custom: {
                        families: this.labelStyle.font.split(',')
                    },
                    active: () => {
                        this.isFirstRender = false;
                        if (this.graphContainer && !this.isShownLabels)
                            this.drawLabels(labelCtx);
                    }
                });
                this.fontLoaded = true;
            } else {
                this.drawLabels(labelCtx);
                this.isShownLabels = true;
            }
        } else
            this.drawLabels(labelCtx);

        this.drawMarks(markCtx);
    }

    getZoom() {
        return this.view.getZoom();
    }

    async changeOpacity(items, show, detectable = true, changeOpacity = true, opacity = null) {
        const colors = {};
        const images = [];
        opacity = (opacity != undefined) ? opacity : show ? 1 : 0.3;

        if (items.size > 0) {
            if (items.isNode) {
                const nodesArray = items.toArray();
                for (const item of nodesArray) {
                    let color = this.realColors[item.getId()] ? this.realColors[item.getId()] : item.getAttribute('color');
                    color = color.substr(0, color.lastIndexOf(',')) + ', ' + (item.getData().frame === false ? 0 : opacity) + ')';

                    if (!colors[color])
                        colors[color] = [];

                    colors[color].push(item.getId());

                    const imagePath = this.realImages[item.getId()];
                    if (imagePath) {
                        const foundImage = images.find(x => x.image === imagePath);
                        if (foundImage)
                            foundImage.ids.push(item.getId());
                        else
                            images.push({ image: imagePath, ids: [item.getId()], changeOpacity: opacity !== 1 });
                    }
                }
            } else {
                items.forEach((item) => {
                    let color = this.realColors[item.getId()] ? this.realColors[item.getId()] : item.getAttribute('color');
                    color = color.substr(0, color.lastIndexOf(',')) + ', ' + opacity + ')';
                    if (!colors[color])
                        colors[color] = [];

                    colors[color].push(item.getId());
                });
            }
        }

        for (const color in colors) {
            if (colors[color]) {
                const thisColorItems = items.isNode ? this.getNodes(colors[color]) : this.getEdges(colors[color]);
                thisColorItems.setAttribute('color', color);
            }
        }

        if (changeOpacity) {
            for (const image of images) {
                let newImage = image.image;
                if (image.changeOpacity)
                    newImage = await this.changeImageOpacity(newImage, opacity);

                const thisColorItems = this.getNodes(image.ids);
                thisColorItems.setAttribute(['image', 'url'], newImage);
            }
        }

        items.setAttribute('detectable', detectable);
    }

    markNodes(marker, nodeIds = []) {
        let nodes = this.getNodes(nodeIds);
        if (nodeIds.length === 0)
            nodes = this.getSelectedNodes();

        nodeIds = nodes.getId().filter((value, index, self) => {
            return self.indexOf(value) === index;
        });

        if (!this.markedNodes[marker])
            this.markedNodes[marker] = [];

        for (const nodeId of nodeIds) {
            if (this.markedNodes[marker].includes(nodeId)) {
                this.unMarkNodes([nodeId]);
            } else {
                if (this.nodesMark[nodeId])
                    this.unMarkNodes([nodeId]);
                this.markedNodes[marker].push(nodeId);
                this.nodesMark[nodeId] = marker;
            }
        }

        this.render();

        setTimeout(() => {
            this.render();
        }, 100);
    }

    unMarkNodes(nodeIds = []) {
        let nodes = this.getNodes(nodeIds);
        if (nodeIds.length === 0)
            nodes = this.getSelectedNodes();

        nodeIds = nodes.getId().filter((value, index, self) => {
            return self.indexOf(value) === index;
        });

        for (const nodeId of nodeIds) {
            const lastMarker = this.nodesMark[nodeId];
            if (lastMarker && this.markedNodes[lastMarker] && this.markedNodes[lastMarker].includes(nodeId)) {
                const index = this.markedNodes[lastMarker].indexOf(nodeId);
                if (index > -1) {
                    this.markedNodes[lastMarker].splice(index, 1);
                    if (this.markedNodes[lastMarker].length === 0)
                        delete this.markedNodes[lastMarker];
                }
            }

            delete this.nodesMark[nodeId];
        }

        this.render();

        setTimeout(() => {
            this.render();
        }, 100);
    }

    markEdges(marker, edgeIds = []) {
        let edges = this.getEdges(edgeIds);
        if (edgeIds.length === 0)
            edges = this.getSelectedEdges();

        edgeIds = edges.getId().filter((value, index, self) => {
            return self.indexOf(value) === index;
        });

        if (!this.markedEdges[marker])
            this.markedEdges[marker] = [];

        for (const edgeId of edgeIds) {
            if (this.markedEdges[marker].includes(edgeId)) {
                this.unMarkEdges([edgeId]);
            } else {
                if (this.edgesMark[edgeId])
                    this.unMarkEdges([edgeId]);
                this.markedEdges[marker].push(edgeId);
                this.edgesMark[edgeId] = marker;
            }
        }

        this.render();

        setTimeout(() => {
            this.render();
        }, 100);
    }

    unMarkEdges(edgeIds = []) {
        let edges = this.getEdges(edgeIds);
        if (edgeIds.length === 0)
            edges = this.getSelectedEdges();

        edgeIds = edges.getId().filter((value, index, self) => {
            return self.indexOf(value) === index;
        });

        for (const edgeId of edgeIds) {
            const lastMarker = this.edgesMark[edgeId];
            if (lastMarker && this.markedEdges[lastMarker] && this.markedEdges[lastMarker].includes(edgeId)) {
                const index = this.markedEdges[lastMarker].indexOf(edgeId);
                if (index > -1) {
                    this.markedEdges[lastMarker].splice(index, 1);
                    if (this.markedEdges[lastMarker].length === 0)
                        delete this.markedEdges[lastMarker];
                }
            }

            delete this.edgesMark[edgeId];
        }

        this.render();

        setTimeout(() => {
            this.render();
        }, 100);
    }

    getMarkedNodeIds(marker) {
        return this.markedNodes[marker];
    }

    getMarkedEdgeIds(marker) {
        return this.markedEdges[marker];
    }

    getNodesMark(nodeIds) {
        const result = [];
        for (const nodeId of nodeIds) {
            result.push(this.nodesMark[nodeId]);
        }
        return result;
    }

    getEdgesMark(edgeIds) {
        const result = [];
        for (const edgeId of edgeIds) {
            result.push(this.edgesMark[edgeId]);
        }
        return result;
    }

    moveNode(node, dist) {
        node.setAttribute('x', node.getPosition().x + dist.x).then(result => {
            result.setAttribute('y', result.getPosition().y + dist.y);
        });
    }

    changeColor(color, nodeIds) {
        let nodes = this.getNodes(nodeIds);
        if (nodeIds.length === 0)
            nodes = this.getSelectedNodes();

        nodes.setAttribute('color', color);
    }

    selectNodes(active, nodeIds) {
        let nodes = this.getNodes(nodeIds);
        if (nodeIds.length === 0)
            nodes = this.getSelectedNodes();

        this.forceUnselect = true;
        nodes.setSelected(active);
    }

    selectEdges(active, edgeIds) {
        const realEdgeIds = [];

        for (const edgeId of edgeIds) {
            realEdgeIds.push(this.edgeRelations.realToViewRelation[edgeId]);
        }

        let edges = this.getEdges(realEdgeIds);
        if (realEdgeIds.length === 0)
            edges = this.getSelectedEdges();

        this.forceUnselect = true;
        edges.setSelected(active);
    }

    changeRadius(radius, nodeIds) {
        let nodes = this.getNodes(nodeIds);
        if (nodeIds.length === 0)
            nodes = this.getSelectedNodes();

        nodes.setAttribute('radius', radius);
    }

    async applyGrouping() {
        const realEdges = await this.setEdgeRelations();
        const edges = realEdges.filter(x => x.data.isMultiple);
        const appliedEdgeIds = {};
        const newEdges = [];

        for (const edge of edges) {
            if (appliedEdgeIds[edge.id] === undefined) {
                const data = _.cloneDeep(edge.data);
                const parallelEdgeIds = this.getGroupedEdges(edge);

                const parallelEdges = edges.filter(x => parallelEdgeIds.includes(x.id));
                const attributes = _.cloneDeep(edge.attributes);
                if (_.uniq(parallelEdges.map(x => x.source)).length !== 1) {
                    attributes.shape = { head: 'arrow', tail: 'arrow' };
                    data.bidirectional = true;
                }
                attributes.color = this.realColors[edge.id];

                data.isMultiple = false;
                data.equivalentEdges = this.edgesToJSON(parallelEdges);
                data.label = [];
                data.equivalentEdges.forEach((equivalentEdge) => {
                    const extendedLabels = equivalentEdge.data.label.filter(x => x.isExtended);
                    for (const extendedLabel of extendedLabels) {
                        const currentLabel = data.label.find(x => x.title === extendedLabel.title);
                        if (currentLabel) {
                            currentLabel.value = (+currentLabel.value + +extendedLabel.value).toString();
                        } else {
                            data.label.push({ title: extendedLabel.title, value: extendedLabel.value, isExtended: true });
                        }
                    }
                });
                data.hasLabel = data.label.length > 0;

                const newEdge = {
                    id: this.edgeRelations.realToViewRelation[edge.id],
                    attributes: attributes,
                    source: edge.source,
                    target: edge.target,
                    data: data
                };

                newEdges.push(newEdge);

                for (const parallelEdgeId of parallelEdgeIds)
                    appliedEdgeIds[parallelEdgeId] = '';
            }
        }

        this.addEdges(newEdges);
        this.removeEdges(Object.keys(appliedEdgeIds));
        this.render();
    }

    async changeGroupMode(groupMode, edges) {
        if (!edges)
            edges = this.getEdges();

        const realEdges = this.getRealEdges(edges);

        const groupedEdges = edges.filter(x => x.getData().equivalentEdges != undefined);
        const nonGroupedEdges = edges.filter(x => x.getData().equivalentEdges == undefined);

        groupedEdges.forEach((edge) => {
            edge.getData().equivalentEdges.forEach(equivalentEdge => equivalentEdge.data.groupMode = groupMode);
        });
        nonGroupedEdges.forEach((edge) => edge.getData().groupMode = groupMode);

        await this.applyGrouping();
        return new Promise((resolve) => resolve(realEdges.map(x => x.id)));
    }

    getRealColor(id) {
        return this.realColors[id];
    }

    getRealImage(id) {
        return this.realImages[id];
    }

    setRealColor(items, color) {
        const result = [];
        for (const item of items.toArray()) {
            if (item.getData().equivalentEdges) {
                const ids = item.getData().equivalentEdges.map(x => x.id);
                for (const id of ids)
                    this.realColors[id] = color;
                this.realColors[item.getId()] = color;
                result.push(...ids);
            } else {
                const id = item.getId();
                this.realColors[id] = color;
                result.push(id);
            }
        }

        return result;
    }

    getSelectedEdgeIds() {
        const selectedEdges = this.getSelectedEdges();
        const edgeIds = [];

        selectedEdges.forEach((edge) => {
            if (edge.getData().equivalentEdges) {
                edgeIds.push(...edge.getData().equivalentEdges.map(x => x.id));
            } else {
                edgeIds.push(edge.getId());
            }
        });

        return edgeIds;
    }

    clearMarks() {
        this.markContextRelocation();
        this.markContext.width = this.graphContainer.clientWidth;
        this.markContext.height = this.graphContainer.clientHeight;
        this.markCtx.clearRect(0, 0, this.graphContainer.clientWidth, this.graphContainer.clientHeight);
    }

    clearLabels() {
        this.labelContextRelocation();
        this.labelContext.width = this.graphContainer.clientWidth;
        this.labelContext.height = this.graphContainer.clientHeight;
        this.labelCtx.clearRect(0, 0, this.graphContainer.clientWidth, this.graphContainer.clientHeight);
    }

    async setEdgeRelations() {
        const promise = new Promise((resolve) => {
            const edges = this.getEdges();
            const realEdges = this.getRealEdges(edges);

            const selectedEdgeIds = this.getSelectedEdgeIds();

            this.removeEdges(edges);

            const addedEdges = [];
            this.edgeRelations = new OgmaEdgeRelations();
            for (const edge of realEdges) {
                if (!addedEdges.includes(edge.id)) {
                    if (edge.data.groupMode === GroupMode.nonGrouping) {
                        this.edgeRelations.push(edge.id, edge.id);
                        edge.data.isMultiple = false;
                        addedEdges.push(edge.id);
                    } else {
                        const equivalentEdges = this.getEquivalentEdges(edge, realEdges);
                        const id = equivalentEdges.length === 1 ? edge.id : Guid.create().toString();

                        equivalentEdges.forEach((equivalentEdge) => {
                            this.edgeRelations.push(equivalentEdge.id, id);
                            equivalentEdge.data.isMultiple = equivalentEdges.length > 1;
                        });
                        addedEdges.push(...equivalentEdges.map(x => x.id));
                    }
                }
            }

            this.addEdges(realEdges.filter(x => x.data.isMultiple === false)).then(() => {
                this.selectEdges(true, selectedEdgeIds);
                resolve(realEdges);
            });
        });

        return promise;
    }

    getRealEdges(edges) {
        const groupedEdges = edges.filter(x => x.getData().equivalentEdges != undefined);
        const nonGroupedEdges = this.edgesToJSON(edges.filter(x => x.getData().equivalentEdges == undefined).toJSON());
        let realEdges = [];

        groupedEdges.forEach((edge) => {
            edge.getData().equivalentEdges.forEach(equivalentEdge => {
                equivalentEdge.attributes.color = this.realColors[equivalentEdge.id] ? this.realColors[equivalentEdge.id] : this.realColors[edge.getId()];
                equivalentEdge.attributes.width = edge.getAttribute('width');
            });
            realEdges.push(...edge.getData().equivalentEdges);
        });

        realEdges.push(...nonGroupedEdges);
        realEdges = _.uniq(realEdges);

        return realEdges;
    }

    getEquivalentEdges(edge, edges) {
        let parallelEdges = edges.filter(x => (x.source === edge.source && x.target === edge.target) || (x.target === edge.source && x.source === edge.target)).filter(x => x.data.groupMode === edge.data.groupMode && edges.includes(x));

        switch (edge.data.groupMode) {
            case GroupMode.groupByDirection:
                parallelEdges = parallelEdges.filter(x => x.source === edge.source && x.data.elementId === edge.data.elementId);
                break;
            case GroupMode.groupByOntology:
                parallelEdges = parallelEdges.filter(x => x.data.elementId === edge.data.elementId);
                break;
        }

        return parallelEdges;
    }

    getGroupedEdges(edge) {
        const id = this.edgeRelations.realToViewRelation[edge.id];
        return this.edgeRelations.viewToRealRelation[id];
    }

    drawMarks(ctx) {
        this.clearMarks();
        const imgSize = 50;

        for (const mark in this.markedNodes) {
            if (this.markedNodes[mark]) {
                const imagePath = this.markerIcon[mark];
                const nodeIds = this.markedNodes[mark];
                const nodes = this.getNodes(nodeIds).toArray();
                for (const node of nodes) {
                    if (node.isInView) {
                        const position = node.getPositionOnScreen();

                        const image = new Image(imgSize, imgSize);
                        image.src = imagePath;

                        const x = position.x - image.width / 2;
                        const y = position.y - image.height;

                        ctx.drawImage(image, x, y, imgSize, imgSize);
                    }
                }
            }
        }

        for (const mark in this.markedEdges) {
            if (this.markedEdges[mark]) {
                const imagePath = this.markerIcon[mark];
                const edgeIds = this.markedEdges[mark];
                const edges = this.getEdges(edgeIds).toArray();

                for (const edge of edges) {
                    if (edge.isInView) {
                        const position = this.getCenterOfEdge(edge);

                        const image = new Image(imgSize, imgSize);
                        image.src = imagePath;

                        const x = position.x - image.width / 2;
                        const y = position.y - image.height;

                        ctx.drawImage(image, x, y, imgSize, imgSize);
                    }
                }
            }
        }
    }

    createContext() {
        if (!this.graphContainer)
            return;

        if (this.labelContext)
            this.labelContext.remove();
        this.labelContext = createHiDPICanvas(this.graphContainer.clientWidth, this.graphContainer.clientHeight);
        this.labelContext.style.position = 'absolute';
        this.labelContext.style.top = '0';
        this.labelContext.style.left = '0';
        this.labelCtx = this.labelContext.getContext('2d');

        if (this.markContext)
            this.markContext.remove();
        this.markContext = createHiDPICanvas(this.graphContainer.clientWidth, this.graphContainer.clientHeight);
        this.markContext.style.position = 'absolute';
        this.markContext.style.top = '0';
        this.markContext.style.left = '0';
        this.markContext.style.pointerEvents = 'none';
        this.markCtx = this.markContext.getContext('2d');
    }

    labelContextRelocation() {
        this.labelCtx.globalCompositeOperation = 'destination-atop';
        const place = this.graphContainer.firstChild;
        //place.appendChild(this.context);
        if (place !== this.labelContext)
            this.graphContainer.insertBefore(this.labelContext, place);
    }

    wiringContextRelocation() {
        this.wiringCtx.globalCompositeOperation = 'destination-atop';
        const place = this.graphContainer.firstChild;
        if (place !== this.wiringContext)
            this.graphContainer.insertBefore(this.wiringContext, place);
    }

    markContextRelocation() {
        this.markCtx.globalCompositeOperation = 'destination-atop';
        const place = this.graphContainer.lastChild;
        if (place !== this.markContext)
            place.after(this.markContext);
    }

    drawLine(ctx) {
        this.wiringContextRelocation();
        ctx.clearRect(0, 0, this.graphContainer.clientWidth, this.graphContainer.clientHeight);

        if (this.wiring) {
            const mouse = this.getPointerInformation();
            ctx.lineWidth = 10 * this.getZoom();
            ctx.strokeStyle = 'rgba(0,122,204,1)';
            ctx.beginPath();
            const firstNodePosition = this.firstWiredNode.getPositionOnScreen();
            ctx.moveTo(firstNodePosition.x, firstNodePosition.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }
    }

    drawLabels(ctx) {
        this.clearLabels();

        let maxLabels = 100;

        const selectedNodes = this.getSelectedNodes().toArray().sort((a, b) => a.getAttribute('radius') > b.getAttribute('radius') ? 1 : a.getAttribute('radius') < b.getAttribute('radius') ? -1 : 0);

        let cnt = this.drawNodeLabels(selectedNodes, maxLabels, ctx);
        maxLabels -= cnt;

        if (maxLabels <= 0)
            return;

        const selectedEdges = this.getSelectedEdges().toArray().sort((a, b) => a.getAttribute('width') > b.getAttribute('width') ? 1 : a.getAttribute('width') < b.getAttribute('width') ? -1 : 0);

        cnt = this.drawEdgeLabels(selectedEdges, maxLabels, ctx);
        maxLabels -= cnt;

        if (maxLabels <= 0)
            return;

        const unselectedNodes = this.getNonSelectedNodes().toArray().sort((a, b) => a.getAttribute('radius') > b.getAttribute('radius') ? 1 : a.getAttribute('radius') < b.getAttribute('radius') ? -1 : 0);

        cnt = this.drawNodeLabels(unselectedNodes, maxLabels, ctx);
        maxLabels -= cnt;

        if (maxLabels <= 0)
            return;

        const unselectedEdges = this.getNonSelectedEdges().toArray().sort((a, b) => a.getAttribute('width') > b.getAttribute('width') ? 1 : a.getAttribute('width') < b.getAttribute('width') ? -1 : 0);

        cnt = this.drawEdgeLabels(unselectedEdges, maxLabels, ctx);
        maxLabels -= cnt;
    }

    drawNodeLabels(nodes, maxLabels, ctx) {
        const zoom = this.getZoom();
        let cnt = 0;

        for (const node of nodes) {
            if (!node.isInView() || !node.getData().hasLabel || !node.getData().label)
                continue;

            const nodeSize = node.getAttribute('radius') * zoom;
            if (nodeSize < this.labelStyle.minNodeDisplay)
                continue;

            if (cnt > maxLabels)
                break;

            const position = node.getPositionOnScreen();
            const x = position.x;
            const y = position.y + nodeSize;

            const fontSize = this.labelStyle.fontSize * nodeSize / 20;
            ctx.font = fontSize + 'px ' + this.labelStyle.font;
            const lineHeight = fontSize * 1.5;

            const lines = node.getData().label.split('\n');
            const linesWidth = lines.map((line) => ctx.measureText(line).width);
            const width = Math.min(Math.max(...linesWidth), 4 * nodeSize);
            const maxLength = Math.min(lines.length, this.labelStyle.maxLine);

            ctx.globalAlpha = node.getData().isEnable === false ? 0.5 : 1;
            ctx.fillStyle = this.labelStyle.background;
            ctx.fillRect(x - width / 1.8, y * 1.01, width * 1.1, (maxLength + 0.5) * lineHeight);

            ctx.strokeStyle = this.labelStyle.stroke;
            ctx.strokeRect(x - width / 1.8, y * 1.01, width * 1.1, (maxLength + 0.5) * lineHeight);

            ctx.fillStyle = this.labelStyle.fontColor;

            for (let i = 0; i < maxLength; i++) {
                const result = getFitText(lines[i], width, ctx);
                if (i === 0 && result.width === 0)
                    break;
                const posX = this.labelStyle.dir === 'rtl' ? x + result.width / 2 : x - result.width / 2;
                ctx.fillText(result.text, posX, y + (i + 1) * lineHeight);
            }

            cnt++;
        }

        return cnt;
    }

    drawEdgeLabels(edges, maxLabels, ctx) {
        const zoom = this.getZoom();
        let cnt = 0;

        for (const edge of edges) {
            if (!edge.isInView() || !edge.getData().hasLabel || !edge.getData().label || edge.getData().isMultiple)
                continue;

            const edgeSize = edge.getAttribute('width') * zoom;
            if (edgeSize < this.labelStyle.minEdgeDisplay)
                continue;

            if (cnt > maxLabels)
                break;

            const lines = edge.getData().label.split('\n');
            const maxLength = Math.min(lines.length, this.labelStyle.maxLine);
            const thickness = edge.getAttribute('width') * zoom;

            const fontSize = this.labelStyle.fontSize * thickness / 5;
            ctx.font = fontSize + 'px ' + this.labelStyle.font;
            const lineHeight = fontSize * 1.5;

            const linesWidth = lines.map((line) => ctx.measureText(line).width);
            const distance = edge.getSource().getId() === edge.getTarget().getId() ? Number.MAX_VALUE : Math.sqrt(Math.pow(edge.getSource().getPositionOnScreen().x - edge.getTarget().getPositionOnScreen().x, 2) + Math.pow(edge.getSource().getPositionOnScreen().y - edge.getTarget().getPositionOnScreen().y, 2)) * 0.8;
            const width = Math.min(Math.max(...linesWidth), distance);

            const position = this.getCenterOfEdge(edge);
            position.y -= fontSize / 2;

            const x = position.x;
            const y = position.y + fontSize;

            ctx.globalAlpha = edge.getData().isEnable === false ? 0.5 : 1;
            ctx.fillStyle = this.labelStyle.background;
            ctx.fillRect(x - width / 1.8, y + thickness / 2, width * 1.1, (lines.length + 0.5) * lineHeight);

            ctx.strokeStyle = this.labelStyle.stroke;
            ctx.strokeRect(x - width / 1.8, y + thickness / 2, width * 1.1, (lines.length + 0.5) * lineHeight);

            ctx.fillStyle = this.labelStyle.fontColor;

            for (let i = 0; i < maxLength; i++) {
                const result = getFitText(lines[i], width, ctx);
                if (i === 0 && result.width === 0)
                    break;
                const posX = this.labelStyle.dir === 'rtl' ? x + result.width / 2 : x - result.width / 2;
                ctx.fillText(result.text, posX, y + (i + 1) * lineHeight + thickness / 2);
            }

            cnt++;
        }
        return cnt;
    }

    getCenterOfEdge(edge) {
        const source = edge.getSource();
        const target = edge.getTarget();
        const curvature = edge.getAttribute('curvature');

        const sourcePosition = source.getPosition();
        const targetPosition = target.getPosition();
        const multiplex = source.getPosition().x >= target.getPosition().x ? -1 : 1;

        const theta = target.getId() === source.getId() ? 0 : Math.atan((targetPosition.y - sourcePosition.y) / (targetPosition.x - sourcePosition.x));

        const center = {
            x: (source.getPosition().x + target.getPosition().x) / 2 + multiplex * curvature * Math.abs(source.getPosition().y - target.getPosition().y) / 10 * Math.sin(theta),
            y: (source.getPosition().y + target.getPosition().y) / 2 - multiplex * curvature * Math.abs(source.getPosition().x - target.getPosition().x) / 10 * Math.cos(theta),
        };

        return this.view.graphToScreenCoordinates({ x: center.x, y: center.y });
    }

    resize() {
        this.createContext();
        this.render();
    }

    changeCursor(cursor) {
        const children = this.graphContainer.children;
        if (children.length > 1) {
            const canvas = children[1].children;
            if (canvas.length > 1)
                canvas[1].style.cursor = cursor;
        }
    }

    edgesToJSON(edges) {
        const edgesJson = edges;
        edgesJson.forEach(edge => edge.attributes.color = this.realColors[edge.id]);
        return edgesJson;
    }

    async changeImageOpacity(imageUrl, opacity) {
        return new Promise((resolve) => {
            const image = new Image();
            image.src = imageUrl;
            const canvas = document.createElement('canvas');

            image.onload = () => {
                canvas.width = image.width;
                canvas.height = image.height;

                const ctx = canvas.getContext('2d');
                ctx.globalAlpha = opacity;
                ctx.drawImage(image, 0, 0);
                resolve(canvas.toDataURL('image/png'));
            };
        });
    }
}

function getFitText(str, maxWidth, ctx) {
    let width = ctx.measureText(str).width;
    const ellipsis = '\u2026'; // Note : ellipsis letter
    const ellipsisWidth = ctx.measureText(ellipsis).width;
    if (width <= maxWidth || width <= ellipsisWidth) {
        return { text: str, width: width };
    } else if (maxWidth <= ellipsisWidth) {
        return { text: ellipsis, width: 0 };
    } else {
        for (let len = str.length - 1; width + ellipsisWidth > maxWidth; len--) {
            str = str.substring(0, len);
            width = ctx.measureText(str).width;
        }
        return { text: str + ellipsis, width: width };
    }
}

function PIXEL_RATIO() {
    const ctx = document.createElement('canvas').getContext('2d'),
        dpr = window.devicePixelRatio || 1,
        bsr = ctx.webkitBackingStorePixelRatio ||
            ctx.mozBackingStorePixelRatio ||
            ctx.msBackingStorePixelRatio ||
            ctx.oBackingStorePixelRatio ||
            ctx.backingStorePixelRatio || 1;

    return dpr / bsr;
}

function createHiDPICanvas(width, height, ratio) {
    if (!ratio)
        ratio = PIXEL_RATIO();

    const can = document.createElement('canvas');
    can.width = width * ratio;
    can.height = height * ratio;
    can.style.width = width + 'px';
    can.style.height = height + 'px';
    can.getContext('2d').setTransform(ratio, 0, 0, ratio, 0, 0);
    return can;
}

class LabelStyle {
    constructor() {
        this.font = 'arial';
        this.background = '#E9E9E9';
        this.stroke = '#CDCDCD';
        this.maxWidth = 4;
        this.maxLine = 6;
        this.minNodeDisplay = 35;
        this.minEdgeDisplay = 5;
        this.fontSize = 5;
        this.fontColor = 'black';
        this.dir = 'rtl';
    }
}

class GroupMode {
    groupByOntology = 0;
    single = 1;
    groupByDirection = 2;
    nonGrouping = 3;
}
