type JsonLdScriptProps = {
  id?: string;
  data: Record<string, unknown> | Array<Record<string, unknown>>;
};

/**
 * Safe JSON-LD script tag — no `dangerouslySetInnerHTML` XSS via escaping `<`.
 */
function JsonLdScript({ id, data }: JsonLdScriptProps) {
  const payload = Array.isArray(data)
    ? { "@context": "https://schema.org", "@graph": data }
    : data;

  const json = JSON.stringify(payload).replace(/</g, "\\u003c");

  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}

export { JsonLdScript };
export type { JsonLdScriptProps };
