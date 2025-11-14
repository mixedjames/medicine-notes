-- preamble-in-header.lua
-- Move pre-heading paragraphs (and other top-level blocks)
-- into the document header block in HTML output.

function Pandoc(doc)
  local blocks = {}
  local preamble = {}

  -- Split document blocks into preamble (before first Header)
  -- and the rest.
  local found_heading = false
  for _, blk in ipairs(doc.blocks) do
    if not found_heading and blk.t ~= "Header" then
      table.insert(preamble, blk)
    else
      if blk.t == "Header" then
        found_heading = true
      end
      table.insert(blocks, blk)
    end
  end

  -- Move preamble blocks into doc.meta['header-blocks']
  doc.meta["header-blocks"] = preamble

  -- Replace main document body with remaining blocks
  doc.blocks = blocks

  return doc
end
