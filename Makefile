# Makefile — version 10
# Converts .docx → .html into www/documents with full HTML structure,
# external CSS only, and absolutely no embedded <style> block.

SRC_DIR := input
ROOT := docs
OUT_DIR := docs/documents
TEMPLATE := ../build/template.html

# ANSI colors
GREEN := \033[0;32m
RED := \033[0;31m
YELLOW := \033[1;33m
RESET := \033[0m

# Find all .docx files
DOCX_FILES := $(shell find $(SRC_DIR) -type f -name '*.docx')

# Detect illegal filenames (spaces)
BAD_NAMES := $(shell find $(SRC_DIR) -type f -name '*.docx' | grep -E '\ ' || true)

# Map .docx to .html
HTML_FILES := $(DOCX_FILES:$(SRC_DIR)/%.docx=$(OUT_DIR)/%.html)

# Default target
all: check $(HTML_FILES)
	@echo "$(GREEN)✅ All documents processed successfully.$(RESET)"

# Recursive helper: emits one ../ per path component
define _back_words
$(if $1,../$(call _back_words,$(wordlist 2,$(words $1),$1)))
endef

# Public function: compute relative backpath from a given dir to $(ROOT)
# Usage: $(call back_to_root,<dir>)
# Example: $(call back_to_root,$(dir $@))
back_to_root = \
  $(call _back_words, \
    $(subst /, , \
      $(patsubst $(ROOT)/%,%,$(patsubst %/,%,$(1))) \
    ) \
  )

# Rule to build each .html file (debug-friendly, portable)
$(OUT_DIR)/%.html: $(SRC_DIR)/%.docx
	@mkdir -p $(dir $@)
	@echo "$(YELLOW)→ Converting $<$(RESET)"
	@cd $(dir $@) && pandoc "$(realpath $<)" -o $(@F)\
		--standalone \
		--section-divs=true \
		-f docx+styles \
		--extract-media="$(basename $(@F))"\
 		--template="$(call back_to_root,$(dir $@))$(TEMPLATE)" \
		--lua-filter="$(call back_to_root,$(dir $@))../build/pandoc-filters/header-filter.lua" \
		--lua-filter="$(call back_to_root,$(dir $@))../build/pandoc-filters/include-controller.lua" \
		--lua-filter="$(call back_to_root,$(dir $@))../build/pandoc-filters/include-styler.lua" \
		--metadata=controller="$(patsubst %.docx,%.js,$(realpath $<))" \
		--metadata=styler="$(patsubst %.docx,%.css,$(realpath $<))" \
		-V path_to_root="$(call back_to_root,$(dir $@))" \
		--syntax-highlighting=none

# Check for spaces in filenames
check:
ifneq ($(BAD_NAMES),)
	@echo "$(RED)❌ Error: Some .docx filenames contain spaces.$(RESET)"
	@echo "$(BAD_NAMES)" | sed 's/^/   - /'
	@echo ""
	@echo "Please rename these files to remove spaces, then re-run make."
	@false
endif

# Clean up
clean:
	@echo "$(YELLOW)🧹 Removing output directory...$(RESET)"
	@rm -rf $(OUT_DIR)
	@echo "$(GREEN)✔ Clean complete.$(RESET)"

.PHONY: all clean check test1
