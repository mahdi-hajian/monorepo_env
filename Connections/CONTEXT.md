# Connections

BDMP connection create and edit, including the advanced Opaque path on the create-connection page.

## Language

**Create Connection Page**:
The BDMP page that creates and edits a connection (`create-connection-page`), with settings on one side and the data-source viewer on the other.
_Avoid_: connection manager alone, a new standalone product page

**Advanced Connection Mode**:
The create-connection UI path that configures a connection through Monaco JSON instead of the typed form fields.
_Avoid_: opaque-only backend term as the only product name, a separate app route

**Opaque Connection**:
A stored connection whose content format is OpaqueJson: raw payload (connectorName + properties), not typed Oracle/StarRocks connectionInfo.
_Avoid_: typed connection, legacy connection content without contentFormat OpaqueJson

**Typed Connection**:
A stored connection with structured connectionType and connectionInfo (for example Oracle or StarRocks), not OpaqueJson.
_Avoid_: Opaque Connection, calling every connection typed

**Form Tab**:
The create-connection settings tab that edits Typed Connection fields.
_Avoid_: ساده as a domain term until product copy is fixed, Monaco tab

**Custom Tab**:
The create-connection settings tab that edits Opaque Connection payload in Monaco.
_Avoid_: advanced tab as a second concept, form tab

**Active Tab**:
The settings tab the user is on when Save runs; it alone chooses persistence format and which draft is written.
_Avoid_: saving both tabs, merging form and Monaco into one payload

**Default Tab**:
On open, the settings tab that matches the stored format: Typed Connection → Form Tab, Opaque Connection → Custom Tab. The other tab stays available.
_Avoid_: hiding the non-matching tab, always opening Form Tab

**Catalog-Driven Viewer**:
For Opaque Connection, the left panel viewer is chosen from the Preview / GetDataSources catalog response (its shape / type), not from a typed connectionType in the form.
_Avoid_: guessing viewer from Monaco connectorName alone, a single neutral viewer for every Opaque catalog

**Custom Tab Layout**:
In the settings pane on Custom Tab, Monaco fills all remaining height; Test/Update buttons and the connection checkboxes sit only in a footer under Monaco (same controls, not a redesigned bar). The settings pane width is user-resizable.
_Avoid_: fixed short Monaco with empty space below, buttons beside Monaco, non-resizable settings pane
