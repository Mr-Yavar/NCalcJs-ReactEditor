// Editor.jsx
import React, { useEffect, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { createTheme } from "@uiw/codemirror-themes";
import { tags as t } from "@lezer/highlight";
import { StreamLanguage } from "@codemirror/language";
import { keymap, EditorView } from "@codemirror/view";
import { linter, lintGutter } from "@codemirror/lint";
import { autocompletion, CompletionContext } from "@codemirror/autocomplete";

import * as NCalc from "ncalcjs";
import { keyWords, ncalcFunctions, ReservedWords } from "./NCalcWords";

// Define custom NCalcJs language
const ncalcLanguage = StreamLanguage.define({
  token: (stream) => {
    if (stream.eatSpace()) return null;
    if (stream.match(/^\d*\.?\d+/)) return "number";
    if (stream.match(/^[+\-*/%^=<>!&|]/)) return "operator";
    if (stream.match(/^[()[\]]/)) return "bracket";

    const functions = new RegExp(
      "\b(" + ncalcFunctions.map((x) => x.label).join("|") + ")\b",
      "i"
    );

    if (stream.match(functions)) return "builtin";
    const logical = /\b(and|or|not|true|false)\b/i;
    if (stream.match(logical)) return "keyword";
    if (stream.match(/^[a-zA-Z_]\w*/)) return "variable";
    stream.next();
    return null;
  },
});

// Custom theme
const ncalcTheme = createTheme({
  theme: "dark",
  settings: {
    background: "#1e1e1e",
    foreground: "#d4d4d4",
    caret: "#d4d4d4",
    selection: "#264f78",
    lineHighlight: "#2a2a2a",
  },
  styles: [
    { tag: t.number, color: "#164" },
    { tag: t.operator, color: "#219" },
    { tag: t.bracket, color: "#708090" },
    { tag: t.function(t.variableName), color: "#30a" },
    { tag: t.keyword, color: "#708", fontWeight: "bold" },
    { tag: t.variableName, color: "#00f" },
  ],
});

// Custom key bindings
const customKeymap = keymap.of([
  {
    key: "Ctrl-Enter",
    run: (view) => {
      console.log(view);
      const expression = view.state.doc.toString();
      try {
        const calc = new NCalc.Expression(expression);
        const result = calc.Evaluate();
        console.log("Result:", result);
        return true;
      } catch (error) {
        console.error("Evaluation error:", error.message);
        return false;
      }
    },
  },
  {
    key: "Ctrl-Space",
    run: EditorView.openCompletion,
  },
]);

// Linting function
const ncalcLinter = linter((view) => {
  const diagnostics = [];
  const expression = view.state.doc.toString();

  if (!expression.trim()) return diagnostics;

  try {
    const calc = new NCalc.Expression(expression);
    const variables = extractVariables(expression);
    const parameters = {};
    variables.forEach((v) => (parameters[v] = 1));
    calc.Evaluate(parameters);
  } catch (error) {
    const pos = error.message.match(/position (\d+)/)?.[1];
    diagnostics.push({
      from: pos ? parseInt(pos) : 0,
      to: pos ? parseInt(pos) + 1 : expression.length,
      severity: "error",
      message: error.message,
    });
  }

  return diagnostics;
});

// Autocompletion
const ncalcCompletions = (context) => {
  const word = context.matchBefore(/\w*/);
  if (!word || (word.from === word.to && !context.explicit)) return null;

  const expression = context.state.doc.toString();
  const variables = extractVariables(expression);

  const options = [
    ...ncalcFunctions,
    ...keyWords,
    ...variables.map((v) => ({
      label: v,
      type: "variable",
      info: "Defined variable",
    })),
  ];

  return {
    from: word.from,
    options: options.filter((opt) =>
      opt.label.toLowerCase().startsWith(word.text.toLowerCase())
    ),
  };
};

// Extract variables
const extractVariables = (text) => {
  if (!text) return [];
  const varRegex = /\b[a-zA-Z_]\w*\b(?!\s*\()/g;
  const matches = text.match(varRegex) || [];
  const keywords = ReservedWords.map((x) => x.label);
  return [
    ...new Set(matches.filter((v) => !keywords.includes(v.toLowerCase()))),
  ];
};

const Editor = ({ value, onChange = () => {}, setVariables = () => {} }) => {
  const [code, setCode] = useState("");
  // Extract variables
  // Linting function
  const [result, setResult] = useState(null);

  useEffect(() => {
    const vars = extractVariables(code);
    setVariables(vars);

    // Evaluate expression for preview
    try {
      const calc = new NCalc.Expression(code);
      const parameters = {};
      vars.forEach((v) => (parameters[v] = 1)); // Dummy values
      const evalResult = calc.Evaluate(parameters);
      setResult(`= ${evalResult}`);
    } catch (error) {
      setResult(`Error: ${error.message}`);
    }
  }, [code, setVariables]);
  return (
    <div className="editor">
      <CodeMirror
        value={code}
        height="400px"
        extensions={[
          ncalcLanguage,
          customKeymap,
          ncalcLinter,
          lintGutter(),
          autocompletion({ override: [ncalcCompletions] }),
        ]}
        theme={ncalcTheme}
        onChange={(value, obj) => {
          console.log(value, obj);
          setCode(value);
        }}
        basicSetup={{
          lineNumbers: true,
          highlightActiveLine: true,
          tabSize: 2,
          autocompletion: true,
          lintKeymap: true,
        }}
      />
      <div
        className="result-preview"
        style={{ padding: "5px", background: "#f0f0f0", fontFamily: "Arial" }}
      >
        {result || "Enter an expression"}
      </div>
    </div>
  );
};

export default Editor;
