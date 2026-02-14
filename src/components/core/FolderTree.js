function FolderTreeNode({ node }) {
  return (
    <li>
      <button type="button" className="tree-node-btn">{node.name}</button>
      {node.children && node.children.length > 0 ? (
        <ul className="tree-children">
          {node.children.map((child) => (
            <FolderTreeNode key={child.id} node={child} />
          ))}
        </ul>
      ) : null}
    </li>
  );
}

function FolderTree({ data }) {
  return (
    <ul className="folder-tree">
      {data.map((node) => (
        <FolderTreeNode key={node.id} node={node} />
      ))}
    </ul>
  );
}

export default FolderTree;
