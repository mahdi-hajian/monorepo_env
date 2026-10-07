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
