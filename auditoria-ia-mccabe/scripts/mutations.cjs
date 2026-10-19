const {readFileSync,writeFileSync,mkdtempSync,rmSync,mkdirSync}=require('node:fs');
const {tmpdir}=require('node:os');
const path=require('node:path');
const {spawnSync}=require('node:child_process');
const root=path.resolve(__dirname,'..');
const original=readFileSync(path.join(root,'src/penalty.cjs'),'utf8');
const mutations=[
 ['M1','AND reemplazado por OR','late && !emergency','late || !emergency'],
 ['M2','Exención de emergencia invertida','late && !emergency','late && emergency'],
 ['M3','Monto de penalización incorrecto','return 1000','return 999'],
 ['M4','Exención con cargo indebido','return 0','return 1000'],
 ['M5','Condición tardía negada','late && !emergency','!late && !emergency']
];
const temp=mkdtempSync(path.join(tmpdir(),'citas-mutants-'));
const jest=path.join(root,'node_modules/jest/bin/jest.js');
function run(file,naive=false){
 const args=[jest,'--runInBand','--no-coverage'];
 if(naive) args.push('--config','jest.naive.cjs');
 else args.push('--runTestsByPath','tests/penalty.test.cjs');
 return spawnSync(process.execPath,args,{cwd:root,env:{...process.env,PENALTY_MODULE:file},encoding:'utf8'});
}
try{
 const baseline=run(path.join(root,'src/penalty.cjs'));
 if(baseline.status!==0)throw new Error('La suite original no pasa. '+baseline.stderr);
 const results=mutations.map(([id,description,from,to])=>{
   if(!original.includes(from))throw new Error('Mutación no aplicable: '+id);
   const file=path.join(temp,id+'.cjs');writeFileSync(file,original.replace(from,to));
   const strict=run(file),naive=run(file,true);
   const output=strict.stdout+strict.stderr;
   if(!/Tests:.*failed/.test(output)) throw new Error('No se confirmó fallo de aserción en '+id+'\n'+output);
   return {id,description,strictDetected:strict.status!==0,naiveSurvived:naive.status===0};
 });
 const report={scope:'Cinco mutaciones manuales no equivalentes sobre penalty.cjs; no es análisis exhaustivo.',baselinePassed:true,total:results.length,killed:results.filter(r=>r.strictDetected).length,results};
 mkdirSync(path.join(root,'evidence'),{recursive:true});writeFileSync(path.join(root,'evidence/mutations.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
 if(report.killed!==report.total)process.exitCode=1;
}finally{rmSync(temp,{recursive:true,force:true});}
