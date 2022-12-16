import { useContext } from "react";
import { Tree, AnimatedTree } from "react-tree-graph";
import SidePanelContext from "../../store/sidepanel-context";

// using react-tree-graph for graphical representation of the tree data

const SidePanelGraphView = () => {
  const panelCtx = useContext(SidePanelContext);

  const data = panelCtx.items.items;

  return (
    <div>
      (
      <Tree
        data={data}
        height={300}
        width={400}
        margins={{ bottom: 10, left: 20, right: 150, top: 100 }}
      />
      ){/* <AnimatedTree data={contextCtx.items} height={400} width={400} /> */}
    </div>
  );
};

export default SidePanelGraphView;
