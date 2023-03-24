import React, { useEffect } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SvgIcon from '@mui/material/SvgIcon';
import { alpha, styled } from '@mui/material/styles';
import TreeView from '@mui/lab/TreeView';
import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem';

const QueryEngine = require('@comunica/query-sparql').QueryEngine;

// Function that returns the svg for the Minus square
function MinusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
    </SvgIcon>
  );
}

// Function that returns the svg for the Plus square
function PlusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
    </SvgIcon>
  );
}

// Function that returns the svg for the Close square
function CloseSquare(props) {
  return (
    <SvgIcon
      className="close"
      fontSize="inherit"
      style={{ width: 14, height: 14 }}
      {...props}
    >
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z" />
    </SvgIcon>
  );
}

const StyledTreeItem = styled((props) => (
  <TreeItem {...props}  />
))(({ theme }) => ({
  [`& .${treeItemClasses.iconContainer}`]: {
    '& .close': {
      opacity: 0.3,
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 15,
    paddingLeft: 18,
    borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
  },
}));

function ClassHierarchy({endpoint}) {

  const [expanded, setExpanded] = React.useState(['1']);
  const [selected, setSelected] = React.useState([]);
  const [classes, setClasses] = React.useState();
  const myEngine = new QueryEngine();

  function splitLabel(label) {
    label = label.split("/").pop()
    label = label.split("#").pop()
    return label;
  }

  async function query() {

    const bindingsStream = await myEngine.queryBindings(`
    SELECT ?s ?o
    WHERE {
    ?s rdfs:subClassOf ?o .
    }`, {
      sources: [endpoint],
    });

    let query = await bindingsStream.toArray()

    let classList = [];

    query.map((item) => {
      if (item.entries._root.entries[0][1].id && item.entries._root.entries[1][1].id) {
        let label = item.entries._root.entries[0][1].id
        label = splitLabel(label)
        let alreadyIn = false
        classList.map((classItem) => {
          if (label === classItem.class) {
            alreadyIn = true;
          }
        })
        if (!alreadyIn) {
          classList.push({class: label, classes:[]})
        }
      }
    })

    query.map((item) => {
      if (item.entries._root.entries[0][1].id && item.entries._root.entries[1][1].id) {
        let label = item.entries._root.entries[0][1].id
        label = splitLabel(label)

        let label2 = item.entries._root.entries[1][1].id
        label2 = splitLabel(label2)

        classList.map((classItem) => {
          if (classItem.class === label) {
            classItem.classes.push(label2)
          }
        })
      }
      
    })

    setClasses(classList);

  }

  useEffect(() => {
    query();
  }, [])

  const handleToggle = (event, nodeIds) => {
    setExpanded(nodeIds);
  };

  const handleSelect = (event, nodeIds) => {
    setSelected(nodeIds);
  };

  const handleExpandClick = () => {
    setExpanded((oldExpanded) =>
      oldExpanded.length === 0 ? ['1', '3', '7'] : [],
    );
  };

  const handleSelectClick = () => {
    setSelected((oldSelected) =>
      oldSelected.length === 0 ? ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'] : [],
    );
  };

  return (
    <div>
      <div className='quad-head'>
        <h2 >Class Hierarchy</h2>
        <Box>
          <Button onClick={handleExpandClick}>
            {expanded.length === 0 ? 'Expand all' : 'Collapse all'}
          </Button>
          <Button onClick={handleSelectClick}>
            {selected.length === 0 ? 'Select all' : 'Unselect all'}
          </Button>
        </Box>
      </div>
      
      <Box className='class-box'>
        <TreeView
          aria-label="customized"
          defaultCollapseIcon={<MinusSquare />}
          defaultExpandIcon={<PlusSquare />}
          defaultEndIcon={<CloseSquare />}
          expanded={expanded}
          selected={selected}
          onNodeToggle={handleToggle}
          onNodeSelect={handleSelect}
          multiSelect
        >
          {classes && classes.map((item) => (
            <StyledTreeItem nodeId={item.class} key={item.class} label={item.class}>
              {item.classes && item.classes.map((sub) => (
                <StyledTreeItem nodeId={sub} key={sub} label={sub}></StyledTreeItem>
              ))}
            </StyledTreeItem>
          ))}

        </TreeView>
      </Box>
    </div>
  )
}

export default ClassHierarchy