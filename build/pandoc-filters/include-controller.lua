-- include-controller.lua
--
-- This Pandoc Lua filter adds an optional JavaScript controller to a document.
--
-- Usage:
--   pandoc input.docx \
--     --lua-filter=include-controller.lua \
--     --metadata controller=somefile.js \
--     --template=custom.html \
--     -t html5 \
--     -o output.html
--
-- Behaviour:
--   • The file named by the `controller` metadata key is read literally.
--   • If that file exists, its contents are inserted into the document’s metadata
--     as `controller`, ready for expansion in the Pandoc template (e.g. `$controller$`).
--   • If the file does not exist, the filter inserts an empty value instead.
--   • No errors or warnings are produced for missing files — this keeps automated
--     builds quiet when no controller is present.
--
-- Example template usage:
--   ...
--   $body$
--   $controller$
--   </body>
--   </html>

--------------------------------------------------------------------------------
-- Utility: read the entire contents of a file if it exists.
-- Returns the file contents as a string, or nil if the file is missing.
--------------------------------------------------------------------------------
local function read_file(path)

  local file = io.open(path, "r")

  if not file then
    -- Silently skip missing files.
    return nil
  end

  local content = file:read("*a")
  file:close()

  return content
end


--------------------------------------------------------------------------------
-- Utility: store literal HTML content into a metadata field as a raw block.
-- If the content is nil, store an empty block sequence instead.
--------------------------------------------------------------------------------
local function set_controller_meta(meta, content)

  if content then
    -- Create a list containing a single raw HTML block.
    -- This allows the HTML to pass through Pandoc’s rendering unchanged.
    meta.controller = pandoc.MetaBlocks({
      pandoc.RawBlock("html", content)
    })
  else
    -- Set an empty list of blocks (renders as nothing in the template).
    meta.controller = pandoc.MetaBlocks({})
  end
end


--------------------------------------------------------------------------------
-- Filter entry point: called once per document.
--------------------------------------------------------------------------------
function Meta(meta)

  -- The controller file path comes from command-line metadata:
  --   --metadata controller=path/to/controller.js
  local value = meta.controller

  -- If no controller was specified, store an empty value and exit early.
  if not value then
    set_controller_meta(meta, nil)
    return meta
  end

  -- Convert the metadata value (which may be a MetaString or list)
  -- into a plain Lua string representing the path.
  local path = pandoc.utils.stringify(value)

  -- Try to read the file.
  local content = read_file(path)

  -- Store its raw HTML content (or nothing if missing).
  set_controller_meta(meta, content)

  return meta
end
