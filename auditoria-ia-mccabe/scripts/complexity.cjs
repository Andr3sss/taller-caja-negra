const acorn=require('acorn');const walk=require('acorn-walk');const fs=require('node:fs');const path=require('node:path');
const rows=[];
for(const file of fs.readdirSync(path.join(__dirname,'../src')).filter(f=>f.endsWith('.cjs'))){
 const source=fs.readFileSync(path.join(__dirname,'../src',file),'utf8');const ast=acorn.parse(source,{ecmaVersion:'latest',locations:true});
 walk.full(ast,node=>{
  if(!['FunctionDeclaration','FunctionExpression','ArrowFunctionExpression'].includes(node.type))return;
  let predicates=0;
  const visitor=n=>{
   if(n!==node&&['FunctionDeclaration','FunctionExpression','ArrowFunctionExpression'].includes(n.type))return;
   if(['IfStatement','ConditionalExpression','ForStatement','ForInStatement','ForOfStatement','WhileStatement','DoWhileStatement','CatchClause'].includes(n.type))predicates++;
   if(n.type==='LogicalExpression'&&['&&','||','??'].includes(n.operator))predicates++;
   if(n.type==='SwitchCase'&&n.test)predicates++;
   for(const [key,value]of Object.entries(n)){if(['loc','start','end'].includes(key))continue;if(Array.isArray(value))value.forEach(v=>{if(v&&v.type)visitor(v);});else if(value&&value.type)visitor(value);}
  };
  visitor(node);rows.push({file,function:node.id?.name||'callback',line:node.loc.start.line,predicates,complexity:predicates+1});
 });
}
const report={convention:'Decisiones + operadores de cortocircuito + catch + 1; funciones anidadas se miden por separado. SQL y frontend fuera de alcance.',max:Math.max(...rows.map(r=>r.complexity)),functions:rows};
fs.writeFileSync(path.join(__dirname,'../evidence/complexity.json'),JSON.stringify(report,null,2));console.table(rows);if(report.max>10)process.exitCode=1;
