import React, { useState, useEffect } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { Helmet } from 'react-helmet'
import { Button, Modal } from 'vtex.styleguide'

const CSS_HANDLES = ['schemaContainer', 'previewButton', 'modalContent', 'testButton']

const SchemaSEO = ({ schemaType, schemaData }) => {
  const handles = useCssHandles(CSS_HANDLES)
  const [jsonSchema, setJsonSchema] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    if (schemaType && schemaData) {
      const generatedSchema = {
        '@context': 'https://schema.org',
        '@type': schemaType,
        ...schemaData,
      }
      setJsonSchema(generatedSchema)
    }
  }, [schemaType, schemaData])

  const googleTestUrl = jsonSchema
    ? `https://search.google.com/test/rich-results?url=${encodeURIComponent(`data:text/html,${JSON.stringify(jsonSchema)}`)}`
    : '#'

  return (
    <div className={handles.schemaContainer}>
      {jsonSchema && (
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify(jsonSchema)}
          </script>
        </Helmet>
      )}
      <Button 
        className={handles.previewButton} 
        onClick={() => setIsModalOpen(true)}
      >
        Visualizar Schema
      </Button>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Prévia do Schema JSON-LD"
      >
        <pre className={handles.modalContent}>
          {jsonSchema ? JSON.stringify(jsonSchema, null, 2) : 'Nenhum Schema disponível'}
        </pre>
        <a 
          href={googleTestUrl} 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <Button className={handles.testButton}>Testar no Google</Button>
        </a>
      </Modal>
    </div>
  )
}

SchemaSEO.defaultProps = {
  schemaType: 'Product',
  schemaData: {},
}

export default SchemaSEO