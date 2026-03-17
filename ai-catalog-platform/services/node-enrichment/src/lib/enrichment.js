export async function generateEnrichment(input) {
  // Replace this deterministic stub with a real OpenAI call in production.
  const attributes = buildAttributes(input);
  const contextualTags = buildTags(input);

  return {
    attributes,
    contextualTags,
    seoTitle: `${input.name} | ${input.category} solutions`,
    seoDescription: `Explore ${input.name}, a ${input.category} offering designed for performance, discoverability, and enterprise scale.`,
  };
}

function buildAttributes({ category, description, name }) {
  const base = {
    category,
    deploymentModel: inferDeployment(description),
    targetUseCase: inferUseCase(description),
    performanceTier: inferPerformance(description),
  };

  if (category === 'storage') {
    return {
      ...base,
      capacityClass: description.toLowerCase().includes('petabyte') ? 'petabyte-scale' : 'terabyte-scale',
      protocolSupport: description.toLowerCase().includes('s3') ? 'S3' : 'Block/File',
      redundancy: description.toLowerCase().includes('replication') ? 'replication-ready' : 'standard',
      family: `${name.split(' ')[0]} storage`,
    };
  }

  if (category === 'networking') {
    return {
      ...base,
      throughput: description.toLowerCase().includes('100g') ? '100G' : '10G+',
      topology: description.toLowerCase().includes('edge') ? 'edge' : 'core',
    };
  }

  return {
    ...base,
    licenseModel: description.toLowerCase().includes('subscription') ? 'subscription' : 'perpetual',
    integrationStyle: description.toLowerCase().includes('api') ? 'API-first' : 'platform',
  };
}

function buildTags({ description, category }) {
  const raw = [category, inferPerformance(description), inferDeployment(description), inferUseCase(description)];
  return [...new Set(raw.filter(Boolean))];
}

function inferDeployment(text = '') {
  const lower = text.toLowerCase();
  if (lower.includes('hybrid')) return 'hybrid';
  if (lower.includes('cloud')) return 'cloud';
  return 'on-prem';
}

function inferUseCase(text = '') {
  const lower = text.toLowerCase();
  if (lower.includes('backup')) return 'backup';
  if (lower.includes('analytics')) return 'analytics';
  if (lower.includes('ai')) return 'ai workloads';
  return 'general enterprise';
}

function inferPerformance(text = '') {
  const lower = text.toLowerCase();
  if (lower.includes('high performance') || lower.includes('low latency')) return 'high-performance';
  return 'standard';
}
