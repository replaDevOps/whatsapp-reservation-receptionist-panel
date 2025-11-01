import { Flex } from 'antd'
import { BasicPlanCard, BreadCrumbCard, RenewSubscriptionModal, SubscriptionPlanTable } from '../../components'
import { useState } from 'react'

const SubscriptionPlanPage = () => {

    const [ renewvisible, setRenewVisible ] = useState(false)
    const [ renewstate, setRenewState ] = useState(null)
    return (
        <Flex vertical gap={10}>
            <BreadCrumbCard 
                items={[
                    {title:'Business Management'},
                    {title:'Subscription Plan'}
                ]}
            />
            <BasicPlanCard  
                setRenewVisible={setRenewVisible}
                setRenewState={setRenewState}
            />
            <SubscriptionPlanTable 
                renewvisible={renewvisible}
                setRenewVisible={setRenewVisible}
                renewstate={renewstate}
                setRenewState={setRenewState}
            />

            <RenewSubscriptionModal 
                visible={renewvisible}
                renewstate={renewstate}
                onClose={()=>{setRenewVisible(false);setRenewState(null)}}
            />
        </Flex>
    )
}

export {SubscriptionPlanPage}