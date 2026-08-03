import '../styles/TagFilterBar.css'

function TagFilterBar({ tags, selectedTagId, onSelectTag }) {
  return (
    <div className="tag-filter-bar" role="tablist" aria-label="Filter transactions by tag">
      <button
        type="button"
        role="tab"
        aria-selected={selectedTagId === 'all'}
        className={`tag-filter-chip ${selectedTagId === 'all' ? 'is-active' : ''}`}
        onClick={() => onSelectTag('all')}
      >
        All
      </button>

      {tags.map((tag) => (
        <button
          key={tag.id}
          type="button"
          role="tab"
          aria-selected={selectedTagId === tag.id}
          className={`tag-filter-chip ${selectedTagId === tag.id ? 'is-active' : ''}`}
          onClick={() => onSelectTag(tag.id)}
        >
          {tag.name}
        </button>
      ))}
    </div>
  )
}

export default TagFilterBar
