# Connections

BDMP connection create and edit, including the advanced Opaque path on the create-connection page.

## Language

**Create Connection Page**:
The current BDMP connection create/edit page (`new-database-page`), with settings on one side and the data-source viewer on the other.
_Avoid_: legacy `create-connection-page` checkboxes as the product UI, connection manager alone, a new standalone product page

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
In the settings pane on Custom Tab, Monaco fills all remaining height; Test/Update buttons and only the UpdateWhileUsingConnection checkbox sit in a footer under Monaco. Oracle-only checkboxes (all schemas / synonyms) stay off this tab. The settings pane width is user-resizable between the current default and current + 100px (today: min `400px`, max `500px`).
_Avoid_: fixed short Monaco with empty space below, buttons beside Monaco, showing IncludeAllSources or IncludeSynonyms under Monaco, non-resizable settings pane, a large max width beyond +100px

**Payload**:
The JSON document edited in Monaco for an Opaque Connection (API `content.payload`); stored encrypted as EncryptedPayload.
_Avoid_: EncryptedPayload as the UI-facing name, typed connectionInfo fields

**Pinned Catalog**:
An Opaque Connection with UpdateWhileUsingConnection false and a persisted DataSource catalog of selected tables. User fills it via Update → left-panel selection → Save, same as typed flow.
_Avoid_: live mode, empty DataSource when pinned, a separate picker only for Opaque

**Live Catalog**:
An Opaque Connection with UpdateWhileUsingConnection true; DataSource details are not persisted; catalog is fetched when used.
_Avoid_: requiring selected tables on Save in this mode

**Opaque REST Probe**:
Custom Tab Test Connection and data-source Preview call the new REST endpoints with raw Payload before save, or connection id after save—not the legacy MRPC ConnectionObjectPackage paths.
_Avoid_: MRPC TestConnection/GetDataSources for Custom Tab

**Tab Draft**:
In-memory Form Tab and Custom Tab edits kept when switching tabs; only Active Tab is written on Save.
_Avoid_: clearing the other tab on switch, persisting both drafts

**Empty Payload Seed**:
A new Custom Tab opens Monaco with `{}` only—no sample connectorName/properties skeleton.
_Avoid_: Bruno sample JSON as default editor text, non-empty placeholders

**Backend Probe Error**:
Failures from Opaque REST Probe (including multi-database rejection) are shown using the server message; the UI does not invent a separate multi-catalog rule.
_Avoid_: client-side counting of databases to block Preview/Test
