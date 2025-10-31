async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    console.log("Copied successfully!");
  } catch (err) {
    console.error("Could not copy text:", err);
  }
}

export default copyText;
