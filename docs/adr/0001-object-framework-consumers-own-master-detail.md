# Object Framework consumers own master-detail

Object Framework is used by more than the warehouses list. Master-detail is optional: the consumer turns it on and supplies the nested table (columns, row data, export-below-row). Object Framework does not hard-code Record Source structure. The warehouses list is the first consumer that enables it and passes Source Structure.

**Considered Options**: bake warehouse column defs into Object Framework (rejected — other lists have no Source Structure); a dedicated grid only in `simorgh-warehouses` (rejected — then custom context-menu hooks would bypass the shared list shell).
